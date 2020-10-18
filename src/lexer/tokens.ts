enum Token {
  Text = 'text',
  ExpStart = 'expStart',
  ExpEnd = 'expEnd',
  BlockStart = 'blockStart',
  BlockEnd = 'blockEnd',
  Identifier = 'identifier',
  Arrow = 'arrow',
  DictStart = 'dictStart',
  DictEnd = 'dictEnd',
  Value = 'value',
  ValueNamed = 'valueNamed',
  Star = 'star',
  WhiteSpace = 'ws',
  Colon = 'colon',
  Slash = 'slash',
  Hash = 'hash',
}

export default Token;
