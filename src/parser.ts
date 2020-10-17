import nearely from 'nearley';
import grammar from './parser/index';

const input = `I like the 
{{ choose > Pick an animal: [ *dog : 🐶, cat, mouse, gorilla : 🦍 ] }} 
*{{ this }}* 
{{ /choose }}
the best! 😀 
`;

const parser = new nearely.Parser(nearely.Grammar.fromCompiled(grammar));
parser.feed('i liek dogs {{ /fun }}');

parser.results; // ?
JSON.stringify(parser.results, null, ' '); // ?
