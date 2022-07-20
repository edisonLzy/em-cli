import { getSDK } from '../utils/setupSdk';
import type { AppendOptions } from '../sdk';

interface TOC {
  namespace: string;
}
export async function setDocToSpecToc({
  namespace,
  data,
}: TOC & {
  data: AppendOptions;
}) {
  const sdk = await getSDK();
  const [toc] = await sdk.toc.setDocToSpecToc({
    namespace,
    data,
  });
  return toc;
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
