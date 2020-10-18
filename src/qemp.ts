import Enquirer from 'enquirer';
import Parser from './parser';

// ? This IIFE is just a test to see if what I have works.
// TODO: Add Jest test to lexer, parser, and this. Refactor to actually use types 😟

const template = `I like the {{ choose > Pick an animal: [ *dog : 🐶, cat, mouse, gorilla : 🦍 ] }}*{{ this }}*{{ /choose }} the best! 😀 `;

(async (): Promise<void> => {
  try {
    const output = await qemplate(template);
    console.log(output);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
})();

/**
 * Interactively template a file
 */
async function qemplate(input: string): Promise<string> {
  try {
    Parser.feed(input);
  } catch (err) {
    console.error('Error parsing template file.', err);
  }

  // An array of strings to be joined at the end of iterating the statement list.
  const output = [];

  const contents = Parser.results[0];
  for (const statement of contents) {
    switch (typeof statement) {
      case 'string':
        output.push(statement);
        break;
      case 'object':
        output.push(...(await executePrompt(statement)));
    }
  }

  return output.join('');
}

async function executePrompt(statement): Promise<string[]> {
  switch (statement.prompt.type) {
    case 'confirm':
      return promptConfirm(statement);
    case 'choose':
      return promptChoose(statement);
    default:
      throw new Error(`unsupported prompt type ${statement.prompt.type}`);
  }
}

async function promptConfirm({ prompt, body }): Promise<string[]> {
  const question = prompt.args[0].value;
  const { answer: confirmed } = (await Enquirer.prompt({
    name: 'answer',
    type: 'confirm',
    message: question,
  })) as { answer: string };
  return confirmed ? body : [];
}

async function promptChoose({ prompt, body }): Promise<string[]> {
  const question = prompt.args[0].value;
  const choices = prompt.args[1].items.reduce(
    (obj, item) => ({ [item.name]: item.value, ...obj }),
    {}
  );

  const { answer: selection } = (await Enquirer.prompt({
    name: 'answer',
    type: 'select',
    message: question,
    choices: Object.keys(choices),
    // TODO: respect the default choice
  })) as { answer: string };

  const value = choices[selection];

  // template it into the body
  // TODO: validate the {{ ident }}
  return body.map(statement => {
    if (typeof statement === 'string') {
      return statement;
    } else if (typeof statement === 'object') {
      if (statement.name === 'this') return value;
    }
    throw new Error(`unsupported expression: ${JSON.stringify(statement)}`);
  });
}
