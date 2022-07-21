import { USER_INFO_KEY } from '../constant';
import { store } from '../utils/getStore';
import { getSDK } from '../utils/setupSdk';
export async function getUserInfo() {
  try {
    if (store.has(USER_INFO_KEY)) {
      return store.get(USER_INFO_KEY);
    }
    const sdk = await getSDK();
    const res = await sdk.users.get();
    store.set(USER_INFO_KEY, res);
    return res;
  } catch (e: any) {
    // if (e.status === STATUS.BAD_CREDENTIALS) {
    //   logger.warn('exit token is error');
    //   await refreshToken();
    //   logger.success(
    //     'token has been refresh,please run ee github whoami again'
    //   );
    // }
  }
}
export async function whoami() {
  const { name } = await getUserInfo();
}
