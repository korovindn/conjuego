const {
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} = require('node:fs');
const { dirname, join } = require('node:path');

const sourceDirectory = join(__dirname, '..', 'src', 'dict');
const outputFile = join(__dirname, '..', 'dict', 'por_defecto.json');

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

const parentsByChild = (dictionary) => {
  const parents = new Map();
  for (const [parent, entry] of Object.entries(dictionary)) {
    for (const child of entry.hijos ?? []) {
      parents.set(child, new Set(parents.get(child)).add(parent));
    }
  }
  return parents;
};

const validate = (dictionary) => {
  const errors = [...parentsByChild(dictionary)].flatMap(([child, parents]) => {
    const list = [...parents].join(', ');
    return [
      ...Object.keys(dictionary[child] ?? {})
        .filter((key) => key !== 'formas')
        .map((key) => `"${child}" is a hijo of ${list} and defines ${key}`),
      ...[...parents]
        .filter((parent) => !child.endsWith(parent))
        .map((parent) => `"${child}" does not end with its parent "${parent}"`),
      ...(parents.size > 1
        ? [`"${child}" is a hijo of several parents: ${list}`]
        : []),
    ];
  });

  if (errors.length > 0) {
    throw new Error(
      `Invalid dictionary:\n${errors.map((error) => `  - ${error}`).join('\n')}`,
    );
  }
};

const files = jsonFiles(sourceDirectory).sort();
let dictionary = Object.create(null);

for (const file of files) {
  const contents = JSON.parse(readFileSync(file, 'utf8'));
  if (!isObject(contents)) {
    throw new Error(`Expected a JSON object in ${file}`);
  }
  dictionary = merge(dictionary, contents);
}

validate(dictionary);

mkdirSync(dirname(outputFile), { recursive: true });
writeFileSync(outputFile, `${JSON.stringify(dictionary, null, 2)}\n`);
console.log(`Merged ${files.length} JSON files into ${outputFile}`);
