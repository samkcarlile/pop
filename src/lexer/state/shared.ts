import { Rules } from 'moo';
import Token from '../tokens';

const shared: Rules = {
  [Token.WhiteSpace]: {
    match: /[\n\r\s]+/,
    lineBreaks: true,
  },
};

export default shared;
