import pReduce from 'p-reduce';
import path from 'path';
import fs from 'fs-extra';
import fuzzy from 'fuzzy';
import { inquirer, logger, random } from '@em-cli/shared';
import { setDocToSpecToc } from './toc';
import { getRepos } from './repos';
import { getSlug } from '../utils/getSlug';
import { getSDK } from '../utils/setupSdk';
import { getStoreKey } from '../utils/getStoreKey';
import { store } from '../utils/getStore';
import { STORE_KEY } from '../constant';

export async function getDocs() {
  const sdk = await getSDK();
  const repos = await getRepos();
  // 选择一个 repo
  const repoChoices: Array<{
    label: string;
    value: string;
  }> = repos.map((repo: any) => {
    return {
      label: repo.name,
      value: repo.namespace,
    };
  });
  const { namespace } = await inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'namespace',
      message: 'select repo your want clone',
      source: async (answersSoFar: any, input: string) => {
        if (!input) return repoChoices;
        const results = fuzzy
          .filter(input, repoChoices, {
            extract: (el) => el.value,
          })
          .map((el) => el.original);
        return results;
      },
    },
  ]);

  const res = await sdk.docs.list({
    namespace: namespace,
  });
  return {
    docs: res as Array<{ title: string; id: string }>,
    namespace,
  };
}
export async function deleteDoc({
  namespace,
  id,
}: {
  namespace: string;
  id: string;
}) {
  const spin = logger.spin(`deleting ${namespace}`);
  const sdk = await getSDK();
  await sdk.docs.delete({
    namespace,
    id,
  });
  spin.succeed(`deleted ${namespace}`);
}
export async function batchDeleteDocs() {
  const { docs, namespace } = await getDocs();
  const choices = docs.map(({ id: value, title: name }) => {
    return {
      value,
      name,
    };
  });
  const { deleteDocIds } = await inquirer.singleInquire.checkboxPlus({
    choices,
    name: 'deleteDocIds',
    message: 'select docs you want to delete',
  });
  await Promise.all(
    deleteDocIds.map((id: string) => {
      return deleteDoc({
        namespace,
        id,
      });
    })
  );
}

//TODO 暂时没有去重处理
export async function createDoc({
  namespace,
  title,
  body = '',
  storePath,
}: {
  namespace: string;
  title: string;
  storePath: string[];
  body?: string;
}) {
  const storeKey = getStoreKey([STORE_KEY.DOC, ...storePath]);
  //避免重复创建同名的文档
  if (store.has(storeKey)) {
    return store.get(storeKey);
  }
  const sdk = await getSDK();
  const slug = getSlug();
  const doc = await sdk.docs.create({
    namespace: namespace,
    data: {
      title,
      body,
      slug: slug,
      format: 'markdown',
    },
  });
  store.set(storeKey, doc);
  return doc;
}

/**
 * 创建目录形式的docs
 */
interface CreateNestDocOptions {
  namespace: string;
  fullPath: string;
  repoName: string;
}
export async function createNestDoc(
  accessPath: string[],
  { namespace, fullPath, repoName }: CreateNestDocOptions
) {
  await pReduce<string, [any, string[]]>(
    accessPath,
    async ([acc, curPath], cur, idx) => {
      let content = '';
      let title = cur;
      if (idx === accessPath.length - 1) {
        // 说明是md文件了
        content = (await fs.readFile(fullPath)).toString();
        title = path.basename(fullPath);
      }
      if (!acc) {
        const nextPath = [...curPath, cur];
        // 创建doc
        const doc = await createDoc({
          namespace,
          title: cur,
          body: content,
          storePath: nextPath,
        });
        // 创建目录
        const pre = await setDocToSpecToc({
          namespace,
          data: {
            target_uuid: null,
            doc_ids: [doc.id],
          },
        });
        return [pre, nextPath];
      } else {
        const { uuid: parentUUid } = acc;
        const nextPath = [...curPath, cur];
        const doc = await createDoc({
          namespace,
          body: content,
          title,
          storePath: nextPath,
        });
        const pre = await setDocToSpecToc({
          namespace,
          data: {
            doc_ids: [doc.id],
            target_uuid: parentUUid,
          },
        });
        return [pre, nextPath];
      }
    },
    [null, [repoName]]
  );
}
