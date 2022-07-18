import Configstore from 'configstore';

export const createStore = (
  ...args: ConstructorParameters<typeof Configstore>
) => {
  return new Configstore(...args);
};

export type Store = Configstore;
