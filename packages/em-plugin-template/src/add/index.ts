import { getConfigKey, setConfigKey } from '@em-cli/em-cli';
import { elog } from '@em-cli/shared';
import { download } from '@em-cli/shared';
import path from 'path';
import fs from 'fs-extra';
import { REPO_CACHE_KEY, TEMPLATE_CACHE_KEY } from '../constant';
import { getRepoCacheDir } from '../utils';

const repoCacheDir = getRepoCacheDir();

async function ensureRemoteRepoInLocal() {
  const repoInfo = await getConfigKey(REPO_CACHE_KEY);
  if (!repoInfo) {
    // 更新config 信息
    await setConfigKey(REPO_CACHE_KEY, repoCacheDir);
    // 创建缓存目录
    await fs.mkdir(repoCacheDir);
    elog.info('success create %s', repoCacheDir);
  }
}

async function addRepoInConfigFile(remoteUrl: string) {
  const origin = await getConfigKey(TEMPLATE_CACHE_KEY);
  if (origin) {
    // 原来有值的情况
    const data = JSON.parse(origin);
    if (Array.isArray(data) && !data.includes(remoteUrl)) {
      data.push(remoteUrl);
      await setConfigKey(TEMPLATE_CACHE_KEY, JSON.stringify(data));
      elog.info('success set repo %s in configFile ', remoteUrl);
    } else {
      elog.info('%s is already exist', remoteUrl);
    }
  } else {
    const data = [remoteUrl];
    await setConfigKey(TEMPLATE_CACHE_KEY, JSON.stringify(data));
    elog.info('success set repo %s in configFile ', remoteUrl);
  }
}
function getDirname(remoteUrl: string) {
  const [, name] = remoteUrl.split('/');
  return path.join(repoCacheDir, name);
}
export async function addTemplate(remoteUrl: string) {
  const dirname = getDirname(remoteUrl);
  // 添加模版到配置文件中
  await addRepoInConfigFile(remoteUrl);
  // 添加缓存目录
  await ensureRemoteRepoInLocal();
  // 下载模版到缓存中
  await download(remoteUrl, dirname);
  elog.info('success download %s in %s', remoteUrl, dirname);
  elog.info('your can get template list by ee template', '');
}
