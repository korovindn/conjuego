const {
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} = require('node:fs');
const { basename, dirname, join } = require('node:path');

const sourceDirectory = join(__dirname, '..', 'src', 'dict');
const outputFile = join(__dirname, '..', 'dict', 'por_defecto.json');
const hijosFile = join(sourceDirectory, 'hijos.json');

const isObject = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const merge = (target, source) => {
  if (!isObject(target) || !isObject(source)) return source;

  const result = Object.assign(Object.create(null), target);
  for (const [key, value] of Object.entries(source)) {
    result[key] = merge(result[key], value);
  }
  return result;
};

const jsonFiles = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return jsonFiles(path);
    return entry.isFile() && entry.name.endsWith('.json') ? [path] : [];
  });

const readSource = (file) => {
  const text = readFileSync(file, 'utf8');
  const contents = JSON.parse(text);
  if (!isObject(contents)) {
    throw new Error(`Expected a JSON object in ${file}`);
  }
  const keys = [...text.matchAll(/^ {2}"([^"]+)":/gm)].map(([, key]) => key);
  const duplicated = new Set(keys.filter((key, i) => keys.indexOf(key) !== i));
  const errors = [...duplicated].map(
    (key) => `"${key}" is defined twice in ${basename(file)}`,
  );
  return [contents, errors];
};

const attachHijos = (dictionary, hijos) =>
  Object.entries(hijos).flatMap(([parent, children]) => {
    if (!dictionary[parent]) {
      return [`hijos.json: "${parent}" has no entry in the dictionary`];
    }
    dictionary[parent].hijos = children;
    return children
      .filter((child, i) => children.indexOf(child) !== i)
      .map((child) => `hijos.json: "${child}" is repeated in "${parent}"`);
  });

const parentsByChild = (dictionary) => {
  const parents = new Map();
  for (const [parent, entry] of Object.entries(dictionary)) {
    for (const child of entry.hijos ?? []) {
      parents.set(child, new Set(parents.get(child)).add(parent));
    }
  }
  return parents;
};

const RAICES = new Set(['presente', 'preterito', 'futuro']);

const casillas = (keys) => Object.fromEntries(keys.map((key) => [key, true]));
const IMPERATIVO = casillas([
  'segunda_singular',
  'segunda_singular_voseo',
  'tercera_singular',
  'primera_plural',
  'segunda_plural',
  'tercera_plural',
]);
const PARADIGMA = { primera_singular: true, ...IMPERATIVO };
const FORMAS = {
  indicativo: Object.fromEntries(
    ['presente', 'preterito', 'imperfecto', 'futuro', 'condicional'].map(
      (tiempo) => [tiempo, PARADIGMA],
    ),
  ),
  subjuntivo: {
    presente: PARADIGMA,
    imperfecto: { ra: PARADIGMA, se: PARADIGMA },
    futuro: PARADIGMA,
  },
  imperativo: { afirmativa: IMPERATIVO, negativa: IMPERATIVO },
  no_personal: casillas(['gerundio', 'participio_pasado']),
};

const isCasilla = (value) =>
  value === null ||
  typeof value === 'string' ||
  (Array.isArray(value) &&
    value.length > 0 &&
    value.every((forma) => typeof forma === 'string'));

const formasErrors = (verb, value, schema, path = []) =>
  Object.entries(value).flatMap(([key, child]) => {
    const expected = schema[key];
    const at = [...path, key].join('.');
    if (expected === undefined)
      return [`"${verb}" defines unknown forma ${at}`];
    const valid = expected === true ? isCasilla(child) : isObject(child);
    if (!valid) return [`"${verb}" defines invalid forma ${at}`];
    return expected === true
      ? []
      : formasErrors(verb, child, expected, [...path, key]);
  });

const validate = (dictionary, sourceErrors) => {
  const raicesErrors = Object.entries(dictionary).flatMap(([verb, entry]) =>
    Object.keys(entry.raices ?? {})
      .filter((key) => !RAICES.has(key))
      .map((key) => `"${verb}" defines unknown raiz ${key}`),
  );
  const formaErrors = Object.entries(dictionary).flatMap(([verb, entry]) =>
    entry.formas === undefined
      ? []
      : isObject(entry.formas)
        ? formasErrors(verb, entry.formas, FORMAS)
        : [`"${verb}" defines invalid formas`],
  );
  const hijosErrors = [...parentsByChild(dictionary)].flatMap(
    ([child, parents]) => {
      const list = [...parents].join(', ');
      return [
        ...Object.keys(dictionary[child] ?? {})
          .filter((key) => key !== 'formas')
          .map((key) => `"${child}" is a hijo of ${list} and defines ${key}`),
        ...[...parents]
          .filter((parent) => !child.endsWith(parent))
          .map(
            (parent) => `"${child}" does not end with its parent "${parent}"`,
          ),
        ...(parents.size > 1
          ? [`"${child}" is a hijo of several parents: ${list}`]
          : []),
      ];
    },
  );

  const errors = [
    ...sourceErrors,
    ...raicesErrors,
    ...formaErrors,
    ...hijosErrors,
  ];

  if (errors.length > 0) {
    throw new Error(
      `Invalid dictionary:\n${errors.map((error) => `  - ${error}`).join('\n')}`,
    );
  }
};

const files = jsonFiles(sourceDirectory)
  .filter((file) => file !== hijosFile)
  .sort();
const sourceErrors = [];
let dictionary = Object.create(null);

for (const file of files) {
  const [contents, errors] = readSource(file);
  sourceErrors.push(
    ...errors,
    ...Object.entries(contents)
      .filter(([, entry]) => 'hijos' in entry)
      .map(
        ([verb]) =>
          `"${verb}" defines hijos in ${basename(file)}; move them to hijos.json`,
      ),
  );
  dictionary = merge(dictionary, contents);
}

const [hijos, hijosErrors] = readSource(hijosFile);
sourceErrors.push(...hijosErrors, ...attachHijos(dictionary, hijos));

validate(dictionary, sourceErrors);

mkdirSync(dirname(outputFile), { recursive: true });
writeFileSync(outputFile, `${JSON.stringify(dictionary, null, 2)}\n`);
console.log(`Merged ${files.length + 1} JSON files into ${outputFile}`);
