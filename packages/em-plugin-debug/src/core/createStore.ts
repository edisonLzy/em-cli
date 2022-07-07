import Configstore from 'configstore';
import fs from 'fs';

const packageJson = require('../../package.json');

export function createStore() {
  // Create a Configstore instance.
  const store = new Configstore(packageJson.name, { foo: 'bar' });
  return store;
}
