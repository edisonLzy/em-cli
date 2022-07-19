import { logger, inquirer } from '@em-cli/shared';
import fg from 'fast-glob';
import { v4 as uuidv4 } from 'uuid';
import fuzzy from 'fuzzy';
import { getSDK } from '../utils/setupSdk';
import { getUserInfo } from './users';
import { createDoc } from './docs';
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

export async function syncToRepo(name: string) {
  const { id } = await createRepo({
    name,
    description: 'this is description',
  });
  // TODO
  await createDoc({
    id: id,
    title: 'test/asd',
    body: 'asdasd',
  });
}
export async function syncToRepos(workInDir: string) {
  const dirs = await fg('*', {
    onlyDirectories: true,
  });
  const testDir = dirs.filter((el) => el === '训练营');
  return testDir.map(syncToRepo);
}
