import { Octokit } from 'octokit';
import { getToken } from './getToken';

let instance: any;
export async function getOctokit() {
  if (instance) {
    return instance;
  }
  const token = await getToken();
  instance = new Octokit({
    auth: token,
  });
  return instance;
}
