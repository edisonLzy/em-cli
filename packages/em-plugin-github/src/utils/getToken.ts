import inquirer from 'inquirer';
import { AUTH_TOKEN_KEY } from '../constant';
import { createStore } from './createStore';

const store = createStore();

export async function refreshToken() {
  const { token } = await inquirer.prompt([
    {
      type: 'password',
      name: 'token',
      validate: (val) => {
        if (!val) {
          return '🤔️ please enter github token';
        }
        return true;
      },
      message:
        '🚀 enter your github token from https://github.com/settings/tokens/new?scopes=repo',
    },
  ]);
  store.set(AUTH_TOKEN_KEY, token);
  return token;
}

export async function getToken() {
  if (store.has(AUTH_TOKEN_KEY)) {
    return store.get(AUTH_TOKEN_KEY);
  }
  const token = await refreshToken();
  return token;
}
