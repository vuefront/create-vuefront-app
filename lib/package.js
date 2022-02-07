const { merge, sortByKey } = require('./util')

module.exports = {
  requireFile (filename) {
    try {
      return require(filename)
    } catch (error) {
      return {}
    }
  },
  requireJSON (filename) {
    return JSON.parse(JSON.stringify(this.requireFile(filename)))
  },
  loadPackage (name, generator) {
    if (!name || name === 'none') {
      return {}
    }
    const prefix = name === 'nuxt' ? 'nuxt' : `${name}`
    const pkg = this.requireJSON(`../template/${prefix}/package.json`)
    const pkgHandler = this.requireFile(`../template/${prefix}/package.js`)
    return pkgHandler.apply ? pkgHandler.apply(pkg, generator) : pkg
  },
  load (generator) {
    let name = ''
    if (generator.answers.framework === 'vite') {
      name += 'vite-'
    }
    name += generator.answers.version
    const frameworkPkg = this.loadPackage(name, generator)
    const pkg = merge(frameworkPkg)
    pkg.dependencies = sortByKey(pkg.dependencies)
    pkg.devDependencies = sortByKey(pkg.devDependencies)
    return pkg
  }
}
