#!/usr/bin/env node

import { Splurt } from '../app/Splurt'
import program from 'commander'
import Color from 'colors'
import YAML from 'yamljs'

function list(val : string) : string[] {
  return val.split(',');
}

program
  .version('0.0.1')

  .option('-q, --query <q>', 'Search query')
  .option('--databases <list>', 'Comma separated list of databases to search.')
  .option('-m, --max [n]', 'Maximum number of results.', 10)

  .option('-p, --project <file>', 'Read config from project YAML file.')

  .parse(process.argv);

const splurt = new Splurt

if (program.project) {
  try {
    const options = YAML.load(program.project)

    splurt.query = options.query
    splurt.maximum = options.maximum
    splurt.databases = options.databases
  } catch (e) {
    console.log(Color.red(e.message))
    process.exit()
  }
} else {
  splurt.query = program.query
  splurt.databases = program.databases  
  splurt.maximum = program.max
}

try {
  splurt.execute()
} catch(e) {
  console.log(Color.red(e.message))
}
