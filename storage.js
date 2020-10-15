const HOME = require('os').homedir();
const path = require('path');
const fs = require('fs');

const rootDir =
  process.env.POP_TEMPLATES || path.join(HOME, './.pop_templates');

const toTemplateFileObject = filename => {
  // ? templates are stored in the format: [name].[file].[ext]
  const parts = filename.split('.');
  const name = parts[0];
  const file = parts.slice(1).join('.');
  const ext = path.extname(file).substring(1);
  const fullPath = path.join(rootDir, filename);
  return { name, file, ext, path: fullPath };
};

function init() {
  if (!fs.existsSync(rootDir)) fs.mkdirSync(rootDir);
}

/** Returns a list of template entries */
function list() {
  const files = fs.readdirSync(rootDir);
  return files.reduce(
    (templates, file) => [toTemplateFileObject(file), ...templates],
    []
  );
}

/** Get a template by name */
function findByName(name) {
  return list().find(tmpl => tmpl.name === name);
}

/** Creates a new template file and optionally writes contents to it */
function create(name, filename, contents = '') {
  const templateFile = toTemplateFileObject(`${name}.${filename}`);
  if (fs.existsSync(templateFile.path)) throw new Error('template exists');
  fs.writeFileSync(templateFile.path, contents);
  return templateFile;
}

function rename(oldName, newName) {
  const template = findByName(oldName);
  if (!template) throw new Error("template doesn't exist");

  const newPath = path.join(rootDir, `${newName}.${template.file}`);
  if (fs.existsSync(newPath)) throw new Error('another template has that name');

  fs.renameSync(template.path, newPath);
  return { ...template, path: newPath };
}

function remove(name) {
  const template = findByName(name);
  if (!template) throw new Error("template doesn't exist");
  fs.unlinkSync(template.path);
  return { ...template, deleted: true };
}

module.exports = {
  init,
  list,
  create,
  remove,
  rename,
  findByName,
};
