# ✨ `pop`

## Overview

A small command line tool to make it easy to reuse common files like `.gitignore`, `webpack.config.js`, etc...
It will use your configured `$EDITOR` environment variable to edit template files, or if that isn't set, it will use `code` by default. The eventual goal is to make the template files actual Mustache template files and have Inquirer ask you questions and file in the template data (so you could have an `.eslinrc` template that asks you if you want to include the Prettier plugin, for example).

## Install
It's not published on npm at the moment, so you can do the following to clone the repo and link it globally:
```sh
$ git clone https://github.com/samkcarlile/pop
$ cd pop
$ npm install
$ npm link
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
