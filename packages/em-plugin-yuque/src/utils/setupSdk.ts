import SDK from '@yuque/sdk';
import { getToken } from './getToken';

let instance: any;
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
