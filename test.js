const m = require('mustache');

const template = `
{{ #includeReact }} 
yay!
{{ dog }}
{{ /includeReact }}
this is great!
`;

const parsed = m.parse(template);

console.log(JSON.stringify(parsed[1]));

const rendered = m.render(template, {
  includeReact: { dog: 'fido' },
  emoji: '✨',
});

console.log(rendered);
