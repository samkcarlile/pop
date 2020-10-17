import { Rules } from 'moo';
import Token from '../tokens';

const exp: Rules = {
  [Token.ExpEnd]: { match: '}}', lineBreaks: true, pop: 1 },
  [Token.Arrow]: { match: /\s*>\s*/, value: s => s.trim(), next: 'args' },
  [Token.BlockStart]: { match: /\s*[#\w]+\s*/, value: s => s.trim() },
  [Token.BlockEnd]: {
    match: /\s*\/\w+\s*/,
    value: s => s.trim().slice(1),
  },
};

export default exp;
