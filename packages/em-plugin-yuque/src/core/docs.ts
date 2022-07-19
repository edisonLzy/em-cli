import { getSDK } from '../utils/setupSdk';

export async function createDoc({
  id,
  ...data
}: {
  id: string;
  title: string;
  body: string;
}) {
  const sdk = await getSDK();
  const doc = await sdk.docs.create({
    namespace: id,
    data: {
      ...data,
      slug: 'xxasdasd',
      format: 'markdown',
    },
  });
  console.log(doc);
}
