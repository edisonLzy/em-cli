import { logger, inquirer, pathHelper } from '@em-cli/shared';
import pMap from 'p-map';
import path from 'path';
import fg from 'fast-glob';
import { v4 as uuidv4 } from 'uuid';
import fuzzy from 'fuzzy';
import { store } from './../utils/getStore';
import { getSDK } from '../utils/setupSdk';
import { getUserInfo } from './users';
import { createDoc, createNestDoc } from './docs';
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
      slug: uuidv4(),
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

export async function deleteRepo(namespace: string | number) {
  const spin = logger.spin(`deleting ${namespace}`);
  const sdk = await getSDK();
  await sdk.repos.delete({
    namespace,
  });
  spin.succeed(`deleted ${namespace}`);
}

export async function batchDeleteRepos() {
  const repos: Array<{ namespace: string; name: string }> = await getRepos();
  const choices = repos.map(({ namespace: value, name: label }) => {
    return {
      value,
      label,
    };
  });
  const { namespaces } = await inquirer.prompt([
    {
      type: 'checkbox-plus',
      name: 'namespaces',
      message: 'select repo your want delete',
      source: async (answersSoFar: any, input: string) => {
        if (!input) return choices.map((el) => el.value);
        const results = fuzzy
          .filter(input, choices, {
            extract: (el) => el.value,
          })
          .map((el) => el.original);

        return results;
      },
    },
  ]);
  await Promise.all(namespaces.map(deleteRepo));
}

export async function getMayRepoExist(name: string) {
  if (store.has(name)) {
    return store.get(name);
  }
  const repo = await createRepo({
    name,
    description: `this docs for ${name}`,
  });
  store.set(name, repo);
  return repo;
}

export async function syncToRepo(filePath: string, fullPath: string) {
  const accessPath = pathHelper.separatePath(filePath);
  const [repoName, ...docs] = accessPath;
  // 创建一个知识库
  const { id } = await getMayRepoExist(repoName);
  await createNestDoc(docs, {
    namespace: id,
    fullPath: fullPath,
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
