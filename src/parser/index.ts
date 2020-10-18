import nearely from 'nearley';
import parser from './parser';

export default new nearely.Parser(nearely.Grammar.fromCompiled(parser));
