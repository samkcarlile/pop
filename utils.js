const fs = require('fs');
const path = require('path');
const exec = require('util').promisify(require('child_process').exec);
const { interactiveTemplate } = require('./templating');

/** Executes the template, interactively if necessary, and writes it to the destination */
async function executeTemplate(template, dest) {
  if (fs.existsSync(dest)) throw new Error(`${template.file} already exists`);
  const _dest = path.resolve(dest);

  const contents = await interactiveTemplate(template);

  fs.writeFileSync(_dest, contents);

  return path.relative(process.cwd(), _dest);
}

/** Copies a template to the destination file (resolves to the cwd) */
function copyTemplate(template, dest) {
  if (fs.existsSync(dest)) throw new Error(`${template.file} already exists`);

  const _dest = path.resolve(dest);

  fs.copyFileSync(template.path, _dest);

  return path.relative(process.cwd(), _dest);
}

/** Opens a template file for editing with the system's default application */
async function openWithEditor(template) {
  const editor = process.env.EDITOR || 'code';
  await exec(`${editor} ${template.path}`);
}

module.exports = {
  copyTemplate,
  openWithEditor,
  executeTemplate,
};
