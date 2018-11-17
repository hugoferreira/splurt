#!/usr/bin/program node

import { SplurtComplete } from '../command/SplurtComplete'

import program from 'commander'
import Color from 'colors'
import YAML from 'yamljs'

function list(l : string) : string[] {
  return l.split(',').map(v => v.trim());
}

program
  .version('0.0.1')

  .option('-p, --project <file>', 'Read config from project YAML file.')
  .option('-d, --delay <s>', 'Delay between requests.', 2)
  .option('-c, --cookie <c>', 'Cookie to add to header.')
  .option('-s, --sqlite <database>', 'SQLite database used to store articles.')

  .parse(process.argv);

const splurt = new SplurtComplete

if (program.project) {
  try {
    const options = YAML.load(program.project)

    splurt.delay = options.delay
    splurt.cookie = options.cookie
  } catch (e) {
    console.error(Color.red(e.message))
    process.exit()
  }
} else {
  splurt.delay = program.delay
  splurt.cookie = program.cookie  
  splurt.sqlite = program.sqlite  
}

try {  
  splurt.execute()
} catch(e) {
  console.error(Color.red(e.message))
}
