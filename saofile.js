const validate = require('validate-npm-package-name')

module.exports = {
    prompts: [{
            name: 'name',
            message: 'Project name',
            default: '{outFolder}'
        },
        {
            name: 'description',
            message: 'Project description',
            default: `My VueFront App`
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
        // {
        //     name: 'theme',
        //     message: 'Select VueFront theme',
        //     choices: ['None'/*, 'opencart'*/],
        //     type: 'list',
        //     default: 'None'
        // },
        {
            name: 'framework',
            message: 'Select framework',
            choices: ['vite', 'nuxt'],
            type: 'list',
            default: 'nuxt'
        },
        {
            name: 'pm',
            message: 'Choose a package manager',
            choices: ['yarn', 'npm'],
            type: 'list',
            default: 'yarn'
        },
        {
            name: 'version',
            message: 'Choose VueFront App version',
            choices: ['stable', 'next'],
            type: 'list',
            default: 'stable'
        }

    ],
    templateData() {
        const edge = process.argv.includes('--edge')


        return {
            edge,
        }
    },
    actions() {
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
                    templateDir: 'template/stable'
                })
            }

            if (this.answers.framework === 'vite') {
                actions.push({
                    type: 'add',
                    files: '**',
                    templateDir: 'template/vite-stable'
                })
            }


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
        }

        if(this.answers.version == 'next'){
            if (this.answers.framework === 'nuxt') {
                actions.push({
                    type: 'add',
                    files: '**',
                    templateDir: 'template/next'
                }) 
            }

            if (this.answers.framework === 'vite') {
                actions.push({
                    type: 'add',
                    files: '**',
                    templateDir: 'template/vite-next'
                }) 
            }

            actions.push({
                type: 'move',
                patterns: {
                    gitignore: '.gitignore',
                    '_package.json': 'package.json',
                    '_.eslintrc.js': '.eslintrc.js',
                    '_.env': '.env',
                    '_vuefront.config.js': 'vuefront.config.js'
                }
            })  
        }

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