import Configstore from 'configstore';

const packageJson = require('../../package.json');
let store: Configstore;
export function createStore() {
  // Create a Configstore instance.
  if (store) {
    return store;
  }
  store = new Configstore(packageJson.name);
  return store;
}
