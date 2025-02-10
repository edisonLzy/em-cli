import { SDK } from '../sdk';
import { getToken } from './getToken';

let instance: SDK;

export async function getSDK() {
  if (instance) {
    return instance;
  }
  const token = await getToken();
  instance = new SDK({
    token: token,
  });
  return instance;
}
