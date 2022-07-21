import { inquirer } from '@em-cli/shared';
import { AUTH_TOKEN_KEY } from '../constant';
import { store } from './getStore';

export async function refreshToken() {
  const { token } = await inquirer.prompt([
    {
      type: 'password',
      name: 'token',
      validate: (val) => {
        if (!val) {
          return '🤔️ please enter yuque token';
        }
        return true;
      },
      message:
        '🚀 enter your yuque token from https://www.yuque.com/settings/tokens',
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
