import Configstore from 'configstore';
import packageJson from '../../package.json';

export function createStore() {
  // Create a Configstore instance.
  const store = new Configstore(packageJson.name, { foo: 'bar' });
  return store;
}
