import moo from 'moo';

import main from './state/main';
import exp from './state/exp';
import args from './state/args';
import dictionary from './state/dictionary';

export default moo.states({
  main,
  exp,
  args,
  dictionary,
});
