#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const program = require('commander')
const chalk = require('chalk')
const watchLess = require('../lib/watch')


program
  .version(require('../package').version)

program
  .command('watch')
  .action((options, a) => {
    const resolvePath = path.resolve()
    fs.stat(resolvePath, (err, stats) => {
        if (err) {
          console.log(chalk.yellow(err))
        } else {
          console.log(chalk.bgCyan.white('Less to wxss is running... '))
          watchLess(resolvePath)
        }
      })
  });

program.parse(process.argv)