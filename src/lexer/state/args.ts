import { Rules } from 'moo';
import Token from '../tokens';

const args: Rules = {
  [Token.ExpEnd]: { match: '}}', lineBreaks: true, pop: 1 },
  [Token.Value]: {
    match: /(?:[^[\]{}])+\s?/,
    value: s => s.trim(),
    lineBreaks: true,
  },
  [Token.DictStart]: {
    match: /\s*\[\s*/,
    lineBreaks: true,
    value: s => s.trim(),
    push: 'dictionary',
  },
};

export default args;
