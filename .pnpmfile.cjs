module.exports = {
    hooks: {
      readPackage (pkg) {
        if (pkg.name === 'inquirer-autocomplete-prompt') {
          delete pkg.peerDependencies['inquirer']
        }
        return pkg
      }
    }
}