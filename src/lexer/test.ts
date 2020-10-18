import lexer from './index';

const template = `
{
  {{ confirm > include root? [*yeah, nope] }}
  "root": true,
  {{ /confirm }}
  {{ choose > which parser? 
    [
      TypeScript : @typescript-eslint/parser, 
      Javascript : javascript,
      *Default : false,
      2
    ]
  }}
  "parser": "{{ #this }}",
  {{ /choose }}
}`;

const template2 = `I like the 
{{ 
  choose 
  > 
  Pick an animal: [ *dog : 🐶, cat, mouse, gorilla : 🦍 ] }} *{{ this }}* {{ /choose }}
the best! 😀 
`;

const template3 = `
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

lexer.reset(template3);

const tokens = Array.from(lexer).map(({ value, type }) => ({ type, value })); // ?
