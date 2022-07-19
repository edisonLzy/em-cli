import pReduce from 'p-reduce';
import path from 'path';
import fs from 'fs-extra';
import fuzzy from 'fuzzy';
import { inquirer, logger, random } from '@em-cli/shared';
import { getSDK } from '../utils/setupSdk';
import { getSpecTocUUID, setDocToSpecToc } from './toc';
import { getRepos } from './repos';

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
  const choices = docs.map(({ id: value, title: label }) => {
    return {
      value,
      label,
    };
  });
  const { docs: deleteDocIds } = await inquirer.prompt([
    {
      type: 'checkbox-plus',
      name: 'docs',
      message: 'select docs your want delete',
      source: async (answersSoFar: any, input: string) => {
        if (!input) return choices;
        const results = fuzzy
          .filter(input, choices, {
            extract: (el) => el.value,
          })
          .map((el) => el.original);
        return results;
      },
    },
  ]);
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
}: {
  namespace: string;
  title: string;
  body?: string;
}) {
  const sdk = await getSDK();
  const slug = random.string(8);
  const doc = await sdk.docs.create({
    namespace: namespace,
    data: {
      title,
      body,
      slug: slug,
      format: 'markdown',
    },
  });
  return doc;
}

/**
 * 创建目录形式的docs
 */
interface CreateNestDocOptions {
  namespace: string;
  fullPath: string;
}
export async function createNestDoc(
  accessPath: string[],
  { namespace, fullPath }: CreateNestDocOptions
) {
  await pReduce(
    accessPath,
    async (acc, cur, idx) => {
      if (!acc) {
        return await createDoc({
          namespace,
          title: cur,
        });
      } else {
        const { title: preTitle } = acc;
        let content = '';
        let title = cur;
        if (idx === accessPath.length - 1) {
          // 说明是md文件了
          content = (await fs.readFile(fullPath)).toString();
          title = path.basename(fullPath);
        }
        const doc = await createDoc({
          namespace,
          body: content,
          title,
        });
        const uuid = await getSpecTocUUID({
          namespace,
          title: preTitle,
        });
        console.log(doc, namespace);
        if (uuid) {
          // await setDocToSpecToc({
          //   namespace,
          //   data: {
          //     target_uuid: uuid,
          //     doc_ids: [doc.id],
          //   },
          // });
        }
      }
    },
    null
  );
}
