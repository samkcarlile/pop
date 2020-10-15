# ✨ `pop`

## Overview

A small command line tool to make it easy to template and reuse common files like `.gitignore`, `webpack.config.js`, etc... Template files are stored either in `$POP_TEMPLATES` or `$HOME/.pop_templates`. It uses [Mustache](https://mustache.github.io/) templating to provide some conditional logic to your templates. The plan is to make this a bit more robust in the future.

> Note: Your configured `$EDITOR` environment variable is used when opening template files. If that isn't set, it will use `code` by default (which may not be installed for all users).

## Demo

![pop demo](./docs/demo.svg)

```js
// file: ~/.pop_templates/eslint..eslintrc`
{
  "extends": ["problems", "prettier"],
  "env": {
    {{ #nodeEnv }}
    "node": true
    {{ /nodeEnv }}
  },
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "rules": {
    {{ #consoleOK }}
    "no-console": "off"
    {{ /consoleOK }}
  }
}
```

## Install

It's not published on npm at the moment, so you can do the following to clone the repo and link it globally:

```sh
git clone https://github.com/samkcarlile/pop
cd pop
npm install
npm link
```

## Usage

```sh
Usage: pop [options] [command]

Options:
  -V, --version                           output the version number
  -h, --help                              display help for command

Commands:
  add <name> [dest]                       copy a template to the current directory
  new|create [options] <name> <filename>  create a new template
  edit|e <name>                           open a template for editing
  remove|rm [options] <name>              delete a template
  rename|mv <name> <newName>              rename a template
  list|ls [type]                          list the available template names
  help [command]                          display help for command
```
