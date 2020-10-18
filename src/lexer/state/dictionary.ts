import { Rules } from 'moo';
import Token from '../tokens';

const dictionary: Rules = {
  [Token.DictEnd]: {
    match: /\s*\]\s*/,
    lineBreaks: true,
    value: s => s.trim(),
    pop: 1,
  },
  [Token.Star]: {
    match: /\s*\*/,
    value: s => s.trim(),
  },
  [Token.Colon]: {
    match: /:/,
  },
  [Token.Value]: {
    match: /\s*[^:,\]\n]+,?/,
    lineBreaks: true,
    value: s => s.trim().replace(',', ''),
  },

  // TODO: this could be cleaned up alot...probably doing too much work here with one token
  // [Token.ValueNamed]: {
  //   match: /\s*[^:\n]+:\s*[^,\]]+,?/,
  //   lineBreaks: true,
  //   value: s => s.trim().replace(',', ''),
  // },

  // [Token.Value]: {
  //   match: /\s*[^,\]\n]+,?/,
  //   lineBreaks: true,
  //   value: s => s.trim().replace(',', ''),
  // },
};

export default dictionary;
