#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const sao = require('sao')
const cac = require('cac')
const chalk = require('chalk')
const envinfo = require('envinfo')
const { version } = require('../package.json')

const generator = path.resolve(__dirname, './')

const cli = cac('create-vuefront-app')

const showEnvInfo = async () => {
  console.log(chalk.bold('\nEnvironment Info:'))
  const result = await envinfo
    .run({
      System: ['OS', 'CPU'],
      Binaries: ['Node', 'Yarn', 'npm'],
      Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
      npmGlobalPackages: ['create-vuefront-app']
    })
  console.log(result)
  process.exit(1)
}

const run = () => {
  cli
    .command('[out-dir]', 'Generate in a custom directory or current directory')
    .action((outDir = '.', cliOptions) => {
      if (cliOptions.info) {
        return showEnvInfo()
      }
      console.log()
      console.log(chalk`{cyan create-vuefront-app v${version}}`)

      const { answers, overwriteDir, verbose } = cliOptions
      if (fs.existsSync(outDir) && fs.readdirSync(outDir).length && !overwriteDir) {
        const baseDir = outDir === '.' ? path.basename(process.cwd()) : outDir
        return console.error(chalk.red(
          `Could not create project in ${chalk.bold(baseDir)} because the directory is not empty.`))
      }

      console.log(chalk`✨  Generating VueFront project in {cyan ${outDir}}`)

      const logLevel = verbose ? 4 : 2
      // See https://sao.vercel.app/api.html#standalone-cli
      sao({ generator, outDir, logLevel, answers, cliOptions })
        .run()
        .catch((err) => {
          console.trace(err)
          process.exit(1)
        })
    })

  cli.help()

  cli.version(version)

  cli.parse()
}

try {
  run()
} catch (err) {
  // https://github.com/cacjs/cac/blob/f51fc2254d7ea30b4faea76f69f52fe291811e4f/src/utils.ts#L152
  // https://github.com/cacjs/cac/blob/f51fc2254d7ea30b4faea76f69f52fe291811e4f/src/Command.ts#L258
  if (err.name === 'CACError' && err.message.startsWith('Unknown option')) {
    console.error()
    console.error(chalk.red(err.message))
    console.error()
    cli.outputHelp()
  } else {
    console.error()
    console.error(err)
  }
  process.exit(1)
}