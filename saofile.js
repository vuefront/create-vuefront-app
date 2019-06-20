const { join } = require('path')
const superb = require('superb')
const glob = require('glob')
const spawn = require('cross-spawn')
const validate = require('validate-npm-package-name')

const rootDir = __dirname

module.exports = {
    prompts: [{
            name: 'name',
            message: 'Project name',
            default: '{outFolder}'
        },
        {
            name: 'description',
            message: 'Project description',
            default: `My ${superb()} VueFront App`
        },
        {
            name: 'author',
            type: 'string',
            message: 'Author name',
            default: '{gitUser.name}',
            store: true
        },
        {
            name: 'api',
            message: 'Paste the CMS Connect URL, provided by your CMS Connect App',
            default: ''
        },
        {
            name: 'cors',
            message: 'Activate Cors (Cross-Origin Resource Sharing)',
            choices: ['true', 'false'],
            type: 'list',
            default: 'true'
        },
        {
            name: 'pm',
            message: 'Choose a package manager',
            choices: ['yarn', 'npm'],
            type: 'list',
            default: 'yarn'
        }
    ],
    templateData() {
        const edge = process.argv.includes('--edge')
        const pwa = true
        const linter = false
        const prettier = false
        const axios = false
        const esm = true

        return {
            edge,
            pwa: pwa ? 'yes' : 'no',
            eslint: linter ? 'yes' : 'no',
            prettier: prettier ? 'yes' : 'no',
            axios: axios ? 'yes' : 'no',
            esm
        }
    },
    actions() {

        this.answers.ui = 'none';
        this.answers.server = 'none';
        this.answers.test = 'none';
        this.answers.mode = 'universal';
        this.answers.features = [
            'pwa', 'linter'
        ];
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

        const actions = [{
            type: 'add',
            files: '**',
            templateDir: 'template/nuxt',
            filters: {
                'static/icon.png': 'features.includes("pwa")'
            }
        }]

        actions.push({
            type: 'add',
            files: '**',
            templateDir: `template/frameworks/vuefront`
        })

        actions.push({
            type: 'add',
            files: '*',
            filters: {
                '_.eslintrc.js': 'features.includes("linter")',
                '.prettierrc': 'features.includes("prettier")'
            }
        })

        actions.push({
            type: 'move',
            patterns: {
                gitignore: '.gitignore',
                '_package.json': 'package.json',
                '_.eslintrc.js': '.eslintrc.js',
                '_.env': '.env'
            }
        })

        return actions
    },
    async completed() {
        this.gitInit()


        await this.npmInstall({ npmClient: this.answers.pm })

        const isNewFolder = this.outDir !== process.cwd()
        const cd = () => {
            if (isNewFolder) {
                console.log(`\t${this.chalk.cyan('cd')} ${this.outFolder}`)
            }
        }


        if (this.answers.features.includes('linter')) {
            const options = ['run', 'lint', '--', '--fix']
            if (this.answers.pm === 'yarn') {
                options.splice(2, 1)
            }
            spawn.sync(this.answers.pm, options, {
                cwd: this.outDir,
                stdio: 'inherit'
            })
        }

        console.log()
        console.log(this.chalk.bold(`  To get started:\n`))
        cd()
        console.log(`\t${this.answers.pm} run dev\n`)
        console.log(this.chalk.bold(`  To build & start for production:\n`))
        cd()
        console.log(`\t${this.answers.pm} run build`)
        console.log(`\t${this.answers.pm} start`)

        if (this.answers.test !== 'none') {
            console.log(this.chalk.bold(`\n  To test:\n`))
            cd()
            console.log(`\t${this.answers.pm} run test`)
        }
        console.log()
    }
}