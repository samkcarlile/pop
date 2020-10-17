import { Rules } from 'moo';
import Token from '../tokens';

const main: Rules = {
  [Token.Text]: {
    match: /(?:[^{]|{[^{]|\s)+/,
    lineBreaks: true,
  },
  [Token.ExpStart]: { match: '{{', push: 'exp' },
};

export default main;
