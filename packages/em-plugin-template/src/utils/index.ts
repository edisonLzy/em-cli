import userhome from 'userhome';
import { REPO_CACHE_NAME } from '../constant';
export function getRepoCacheDir() {
  return userhome(REPO_CACHE_NAME);
}
