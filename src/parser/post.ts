export const text = ([token]) => {
  return token.value;
};

export const value = ([token]) => {
  return {
    value: token.value,
    type: token.type,
  };
};

export const identifier = ([token]) => {
  return {
    value: token.value,
    type: token.type,
  };
};

export const field = ([token]) => {
  return {
    default: false,
    type: 'field',
    name: token.value,
    value: token.value,
  };
};

export const defaultField = ([, token]) => {
  return {
    default: true,
    type: 'field',
    name: token.value,
    value: token.value,
  };
};

export const namedField = ([name, , value]) => {
  return {
    default: name.default,
    type: 'field',
    name: name.value,
    value: value.value,
  };
};

export const dictionary = ([, fields]) => {
  return {
    type: 'dictionary',
    items: fields.map(f => f[0]),
  };
};

export const prompt = ([type, _, args]) => {
  return {
    type: type.value,
    args: args.map(a => a[0]),
  };
};

/** We want to 'unwrap' the expression macro and return
 *  the expression body.
 */
export const _expression = tokens => {
  return tokens.slice(1, -1)[0];
};

export const promptExpression = ([[body]]) => {
  return body;
};

export const identExpression = ([[ident]]) => {
  return {
    type: 'ident',
    name: ident.value,
  };
};

export const helperExpression = ([[, name]]) => {
  return {
    type: 'helper',
    name: name.value,
  };
};

export const endExpression = ([[, name]]) => {
  return {
    type: 'blockend',
    value: name.value,
  };
};

export const blockBody = ([tokens]) => {
  return tokens.map(t => t[0]);
};

export const promptBlock = ([prompt, body, end]) => {
  // const body = bodyAndEnd.slice(0, -1);
  // const end = bodyAndEnd;
  return {
    prompt,
    body,
    end,
  };
};

export const main = tokens => {
  return tokens[0].map(t => t[0]);
};
