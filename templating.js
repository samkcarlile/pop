const mustache = require('mustache');
const inquirer = require('inquirer');
const fs = require('fs');

const isLowerCase = c => 'abcdefghijklmnopqrstuvwxyz'.includes(c);
const TokenType = {
  BLOCK: '#',
  NAME: 'name',
};

/** Interactively builds a view and renders the template */
async function interactiveTemplate({ path }) {
  const contents = fs.readFileSync(path, 'utf-8');
  const parseTree = mustache.parse(contents);
  const varTokens = getConditionalTokens(parseTree);

  const view = {};
  for (const [type, key] of varTokens) {
    switch (type) {
      case TokenType.BLOCK:
        view[key] = await askForBooleanValue(key);
        break;
      case TokenType.NAME:
        throw new Error(
          `mustache name tokens will be supported in a later version.`
        );
      default:
        throw new Error(`unsupported token type: ${type}`);
    }
  }

  return mustache.render(contents, view);
}

/** Uses inquirer to ask the user a question based on the token key */
async function askForBooleanValue(key) {
  const message = toQuestion(key);
  const { value } = await inquirer.prompt({
    type: 'confirm',
    name: 'value',
    message,
    default: true, // TODO: provide a way to specify default values in the templates
  });

  return value;
}

/** Filter out text tokens from the parse tree */
// function getVariableTokens(parseTree) {
//   return parseTree.filter(token => ['name', '#'].includes(token[0]));
// }

/** Filter out evrything but conditional block tokens from the parse tree */
function getConditionalTokens(parseTree) {
  return parseTree.filter(token => token[0] === '#');
}

/** Convert a variable name like 'includePrettier' to 'include prettier?' */
function toQuestion(variable) {
  const spaced = variable
    .split('')
    .reduce(
      (str, char) =>
        isLowerCase(char) ? `${str}${char}` : `${str} ${char.toLowerCase()}`,
      ''
    );
  return `${spaced}?`;
}

module.exports = { interactiveTemplate };
