import { logger, inquirer, pathHelper } from '@em-cli/shared';
import pMap from 'p-map';
import path from 'path';
import fg from 'fast-glob';
import { store } from './../utils/getStore';
import { getSlug } from '../utils/getSlug';
import { getSDK } from '../utils/setupSdk';
import { getStoreKey } from '../utils/getStoreKey';
import { getUserInfo } from './users';
import { createDoc, createNestDoc } from './docs';
import { STORE_KEY } from '../constant';

export async function createRepo(params: {
  name: string;
  description?: string;
}) {
  const sdk = await getSDK();
  const { id } = await getUserInfo();
  const spin = logger.spin(`create repo ${params.name}....`);
  const repo = await sdk.repos.create({
    user: id,
    data: {
      ...params,
      slug: getSlug(),
      public: 1,
      type: 'Book',
    },
  });
  spin.succeed(`success create repo ${repo.name}`);
  return repo;
}

export async function getRepos() {
  const sdk = await getSDK();
  const { id } = await getUserInfo();
  const res = await sdk.repos.list({
    user: id,
  });
  return res;
}

export async function deleteRepo(namespace: string) {
  const spin = logger.spin(`deleting ${namespace}`);
  const sdk = await getSDK();
  await sdk.repos.delete({
    namespace,
  });
  spin.succeed(`deleted ${namespace}`);
}

export async function batchDeleteRepos() {
  const repos: Array<{ namespace: string; name: string }> = await getRepos();
  const choices = repos.map(({ namespace: value, name }) => {
    return {
      value,
      name,
    };
  });
  const { namespaces } = await inquirer.singleInquire.checkboxPlus({
    choices,
    name: 'namespaces',
    message: 'select repo you want to delete',
  });
  await Promise.all(namespaces.map(deleteRepo));
}

export async function getMayRepoExist(name: string) {
  const storeKey = getStoreKey([STORE_KEY.REPO, name]);
  if (store.has(storeKey)) {
    return store.get(storeKey);
  }
  const repo = await createRepo({
    name,
    description: `this docs for ${name}`,
  });
  store.set(storeKey, repo);
  return repo;
}

export async function syncToRepo(filePath: string, fullPath: string) {
  const accessPath = pathHelper.separatePath(filePath);
  const [repoName, ...docs] = accessPath;
  // 创建一个知识库
  const spin = logger.spin(`creating ${repoName}...`);
  const { id } = await getMayRepoExist(repoName);
  spin.succeed(`created ${repoName} done`);
  await createNestDoc(docs, {
    namespace: id,
    fullPath: fullPath,
    repoName,
  });
}
export async function syncToRepos(workInDir: string) {
  const mds = await fg('**/*.md', {
    cwd: workInDir,
    onlyFiles: true,
  });
  return pMap(
    mds,
    async (md) => {
      const full = path.join(workInDir, md);
      return await syncToRepo(md, full);
    },
    {
      concurrency: 1,
    }
  );
}
