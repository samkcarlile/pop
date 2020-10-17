import moo from 'moo';
const template = `
{
  {{ confirm > include root? [*yeah, nope] }}
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
}`;

const simple = `
{{ choose > which parser? 
  [
    TypeScript : @typescript-eslint/parser, 
    Javascript : javascript,
    *Default : false,
    regular item
  ] }}

some more stuff

{{ /choose }}`;

const trim = s => s.trim();
const lexer = moo.states({
  // outside an expression
  main: {
    text: {
      match: /(?:[^{]|{[^{]|\s)+/,
      lineBreaks: true,
    },
    expstart: { match: '{{', push: 'exp' },
  },

  // inside an expression {{ ..... }}
  exp: {
    expend: { match: '}}', lineBreaks: true, pop: 1 },
    fnblock: { match: /\s*\w+\s*/, value: trim },
    rarrow: { match: /\s*>\s*/, value: trim, next: 'args' },
    blockend: { match: /\s*\/\w+\s*/, value: s => s.trim().slice(1) },
  },

  // inside an expression block {{ exp }} ..... {{ /exp }}
  block: {
    text: {
      match: /(?:[^{]|{[^{]|\s)+/,
      lineBreaks: true,
    },
  },

  // inside a function within an expression
  args: {
    expend: { match: '}}', lineBreaks: true, pop: 1 },
    value: {
      match: /(?:[^[\]{}])+\s?/,
      value: trim,
      lineBreaks: true,
    },
    dictstart: {
      match: /\s*\[\s*/,
      lineBreaks: true,
      value: trim,
      push: 'dict',
    },
  },

  // inside a dictionary
  dict: {
    dictend: {
      match: /\s*\]\s*/,
      lineBreaks: true,
      value: trim,
      pop: 1,
    },
    // TODO: this could be cleaned up alot...probably doing too much work here with one token
    nameditem: {
      match: /\s*\*?[^:\n]+:\s*[^,\]]+,?/,
      lineBreaks: true,
      value: s => s.trim().replace(',', ''),
    },
    item: {
      match: /\s*\*?[^,\]\n]+,?/,
      lineBreaks: true,
      value: s => s.trim().replace(',', ''),
    },
  },
});

lexer.reset(simple);
const tokens = [];
let token;
while ((token = lexer.next()))
  tokens.push({ type: token.type, value: token.value });
console.log(tokens); // ?

tokens.length; // ?
