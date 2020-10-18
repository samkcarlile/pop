import nearely from 'nearley';
import grammar from './index';

const input = `I like the 
{{ choose > Pick an animal: [ *dog : 🐶, cat, mouse, gorilla : 🦍 ] }} 
  *{{ this }}*
{{ /choose }}
the best! 😀 
`;

const parser = new nearely.Parser(nearely.Grammar.fromCompiled(grammar));
parser.feed(input);

parser.results; // ?
JSON.stringify(parser.results, null, ' '); // ?
