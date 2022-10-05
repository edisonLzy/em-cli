import Configstore from 'configstore';

import packageJson from '../../package.json' assert { type: 'json' };
let store: Configstore;
export function createStore() {
  // Create a Configstore instance.
  if (store) {
    return store;
  }
  store = new Configstore(packageJson.name);
  return store;
}
