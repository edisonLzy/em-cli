import { logger } from '@em-cli/shared';
import { v4 as uuidv4 } from 'uuid';
import { getSDK } from '../utils/setupSdk';
import { getUserInfo } from './users';
export function getRepos() {}
export async function createRepo(params: {
  name: string;
  description?: string;
}) {
  const sdk = await getSDK();
  const { id } = await getUserInfo();
  const spin = logger.spin(`create repo ${params.name}....`);
  const { name } = await sdk.repos.create({
    user: id,
    data: {
      ...params,
      slug: uuidv4(),
      public: 1,
      type: 'Book',
    },
  });
  spin.succeed(`success create repo ${name}`);
}
