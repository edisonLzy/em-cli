import { getSDK } from '../utils/setupSdk';
import type { AppendOptions } from '../sdk';

interface TOC {
  namespace: string;
}
function findLatestDir(dirs: any[]) {
  const dir = dirs.filter((it) => {
    return it.level === 0;
  });
  return dir.shift();
}
export async function setDocToSpecToc({
  namespace,
  data,
}: TOC & {
  data: AppendOptions;
}) {
  const sdk = await getSDK();
  const res = await sdk.toc.setDocToSpecToc({
    namespace,
    data,
  });
  const latestDir = findLatestDir(res);
  return latestDir;
}

export async function getSpecTocUUID({
  namespace,
  title,
}: TOC & {
  title: string;
}): Promise<string | null> {
  const sdk = await getSDK();
  const list = await sdk.toc.getList(namespace);
  const toc = list.find((el: any) => {
    return el.title === title;
  });
  return toc?.uuid ?? null;
}
