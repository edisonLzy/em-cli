const jsonToAst = require('json-estree-ast');

module.exports = async function (file, api, options) {
  const j = api.jscodeshift;
  const rootSource = j(file.source);
  rootSource.find(j.Identifier).forEach((path) => {
    if (path.node.name === 'main') {
      //   path.node = j.identifier('exports');
      //   console.log(path);
      console.log(j.identifier('exports'));
    }
  });
  return rootSource.toSource();
};
module.exports.parser = jsonToAst;
