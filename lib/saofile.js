const { dirname, join, relative } = require('path')
const fs = require('fs')
const spawn = require('cross-spawn')
const validate = require('validate-npm-package-name')
const pkg = require('./package')

const cnaTemplateDir = join(dirname(require.resolve('../package.json')))
const templateDir = join(cnaTemplateDir, 'template')

module.exports = {
  prompts: require('./prompts'),
  templateData () {
    const pm = this.answers.pm === 'yarn' ? 'yarn' : 'npm'
    const pmRun = this.answers.pm === 'yarn' ? 'yarn' : 'npm run'
    return {
      pm,
      pmRun
    }
  },
  actions () {
    const validation = validate(this.answers.name)
    validation.warnings && validation.warnings.forEach((warn) => {
      console.warn('Warning:', warn)
    })
    validation.errors && validation.errors.forEach((err) => {
      console.error('Error:', err)
    })
    validation.errors && validation.errors.length && process.exit(1)
    
    if (this.answers.cors == 'true') {
      this.answers.api = this.answers.api + (this.answers.api.split('?')[1] ? '&' : '?') + 'cors=true'
    }  

    const actions = []

    if(this.answers.version == 'stable'){
        if (this.answers.framework === 'nuxt') {
            actions.push({
                type: 'add',
                files: '**',
                templateDir: join(templateDir, 'stable')
            })
        }

        if (this.answers.framework === 'vite') {
            actions.push({
                type: 'add',
                files: '**',
                templateDir: join(templateDir, 'vite-stable')
            })
        }
    }

    if(this.answers.version == 'next'){
        if (this.answers.framework === 'nuxt') {
            actions.push({
                type: 'add',
                files: '**',
                templateDir: join(templateDir, 'next')
            }) 
        }

        if (this.answers.framework === 'vite') {
            actions.push({
                type: 'add',
                files: '**',
                templateDir: join(templateDir, 'vite-next')
            }) 
        }
    }
        actions.push({
          type: 'add',
          files: '*',
          templateDir
        })

        actions.push({
            type: 'move',
            patterns: {
                gitignore: '.gitignore',
                '_package.json': 'package.json',
                '_.eslintrc.js': '.eslintrc.js',
                '_.eslintrc.json': '.eslintrc.json',
                '_.env': '.env',
                '_vuefront.config.js': 'vuefront.config.js'
            }
        }) 
        const generator = this
        actions.push({
          type: 'modify',
          files: 'package.json',
          handler (data) {
            return { ...data, ...pkg.load(generator) }
          }
        })
        
         // For compiling package.json
        actions.push({
          type: 'add',
          files: 'package.json',
          templateDir: this.outDir
        })

        actions.push({
          type: 'remove',
          files: 'package.js'
        })
        return actions
  },
  async completed () {
    await this.npmInstall({ npmClient: this.answers.pm })

    const chalk = this.chalk
    const isNewFolder = this.outDir !== process.cwd()
    const relativeOutFolder = relative(process.cwd(), this.outDir)
    const cdMsg = isNewFolder ? chalk`\t{cyan cd ${relativeOutFolder}}\n` : ''
    const pmRun = this.answers.pm === 'yarn' ? 'yarn' : 'npm run'

    console.log(chalk`\n🎉  {bold Successfully created project} {cyan ${this.answers.name}}\n`)

    console.log(chalk`  {bold To get started:}\n`)
    console.log(chalk`${cdMsg}\t{cyan ${pmRun} dev}\n`)

    console.log(chalk`  {bold To build & start for production:}\n`)
    console.log(chalk`${cdMsg}\t{cyan ${pmRun} build}`)
    console.log(chalk`\t{cyan ${pmRun} start}\n`)
  }
}