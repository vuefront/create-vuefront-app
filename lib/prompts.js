module.exports = [{
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
  default: 'vite'
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
]