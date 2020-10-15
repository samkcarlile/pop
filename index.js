const { program } = require('commander');
const inquirer = require('inquirer');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');

const utils = require('./utils');
const store = require('./storage');
const { openWithEditor } = require('./utils');
store.init();

program.version('0.0.1');
program.name('pop');

program
  .command('add <name> [dest]')
  .description('copy a template to the current directory')
  .action(async (name, target) => {
    const template = store.findByName(name);
    if (!template) throw new Error(`template '${name}' doesn't exist`);

    const newFile = utils.copyTemplate(template, target || template.file);
    console.log(`✨ wrote template ${name} to`.yellow, newFile.green);
  });

program
  .command('new <name> <filename>')
  .alias('create')
  .option('-n, --no-open', 'skip opening the file for editing')
  .description('create a new template')
  .action(async (name, filename, { open }) => {
    const template = store.create(name, filename);
    console.log(`✨ created template`, name.green);
    if (open) await openWithEditor(template);
  });

program
  .command('edit <name>')
  .alias('e')
  .description('open a template for editing')
  .action(async name => {
    const template = store.findByName(name);
    if (!template) throw new Error(`template '${name}' doesn't exist`);
    await utils.openWithEditor(template);
  });

program
  .command('remove <name>')
  .alias('rm')
  .option('-f, --force', 'skip confirmation')
  .description('delete a template')
  .action(async (name, { force }) => {
    const confirm =
      force ||
      (
        await inquirer.prompt({
          type: 'confirm',
          name: 'confirm',
          message: `remove template ${name}?`,
          default: false,
        })
      ).confirm;
    if (!confirm) return;

    store.remove(name);
    console.log('removed template'.yellow, name.red);
  });

program
  .command('rename <name> <newName>')
  .alias('mv')
  .description('rename a template')
  .action(async (name, newName) => store.rename(name, newName));

program
  .command('list [type]')
  .alias('ls')
  .description('list the available template names')
  .action(type => {
    const templates = store
      .list()
      .filter(tmpl => (type ? tmpl.ext === type : true))
      .sort((a, b) => (a.ext === b.ext ? 0 : a.ext > b.ext ? 1 : -1));

    templates.forEach(({ name, ext, file }) => {
      console.log(
        `• ${`(${ext || '.'})`.cyan} ${name.yellow}`,
        `\t${file}`.dim
      );
    });
  });

program.parseAsync(process.argv).catch(err => console.log(err.message.red));
