import { Rules } from 'moo';
import Token from '../tokens';

const exp: Rules = {
  [Token.ExpEnd]: { match: '}}', lineBreaks: true, pop: 1 },
  [Token.Arrow]: { match: /\s*>\s*/, value: s => s.trim(), next: 'args' },
  [Token.Slash]: { match: /\s*\/\s*/, value: s => s.trim() },
  [Token.Hash]: { match: /\s*#\s*/, value: s => s.trim() },
  [Token.Identifier]: { match: /\s*[\w]+\s*/, value: s => s.trim() },
};

export default exp;
