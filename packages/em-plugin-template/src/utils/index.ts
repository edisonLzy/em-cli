import path from 'path';
import userhome from 'userhome';
import { REPO_CACHE_NAME } from '../constant';

export function getRepoCacheDir() {
  return userhome(REPO_CACHE_NAME);
}

export const repoCacheDir = getRepoCacheDir();

export function getDirnameByRemoteUrl(remoteUrl: string) {
  const [, name] = remoteUrl.split('/');
  return path.join(repoCacheDir, name);
}
