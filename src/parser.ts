import nearely from 'nearley';
import grammar from '../grammar';
const template = `
{
  {{ confirm > do you want the root? [*yeah, nope] }}
  "root": true,
  {{ /confirm }}
  {{ choose > which parser? 
    [
      TypeScript : @typescript-eslint/parser, 
      Javascript : javascript,
      *Default : false
    ]
  }}
  "parser": "{{ this }}",
  {{ /choose }}
  "plugins": ["@typescript-eslint"],
  {{ multi > which do you want to extend? 
    [
      problems,
      *prettier,
      *typescript-eslint/recommended : plugin:@typescript-eslint/recommended
    ]
  }}
  "extends": [ {{ #each }} "{{this}}", {{ /each }} ],
  {{ /multi }}
  "env": {
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "rules": {
    "no-console": "off"
  },
  "ignorePatterns": ["dist", "node_modules", "grammar.js"]
}

`;

const parser = new nearely.Parser(nearely.Grammar.fromCompiled(grammar));

parser.feed('foo\n');

parser.results; // ?
