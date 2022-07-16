import fuzzy from 'fuzzy';
import { logger, inquirer, git } from '@em-cli/shared';
import { STATUS } from '../constant';
import { getOctokit } from '../utils/setupOctokit';
import { refreshToken } from '../utils/getToken';
/**
 * 获取 用户信息
 */
export async function getInfo() {
  try {
    const octokit = await getOctokit();
    const {
      data: { login, avatar_url },
    } = await octokit.rest.users.getAuthenticated();
    logger.success('Hello, %s', login);
  } catch (e: any) {
    if (e.status === STATUS.BAD_CREDENTIALS) {
      logger.warn('exit token is error');
      await refreshToken();
      logger.success(
        'token has been refresh,please run ee github whoami again'
      );
    }
  }
}
/**
 * 获取 所有的仓库
 */
export async function getRepo(dir: string) {
  let spin = logger.spin('init github');
  const octokit = await getOctokit();
  spin.text = 'fetch github repos list';
  const { data } = await octokit.request('GET /user/repos', {
    per_page: 100,
  });
  spin.stop();
  const choices: Array<{
    name: string;
    value: string;
  }> = data.map((item: any) => {
    return {
      name: item.name,
      value: item.clone_url,
    };
  });
  const { repos } = await inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'repos',
      message: 'select repo your want clone',
      source: async (answersSoFar: any, input: string) => {
        if (!input) return choices;
        const results = fuzzy
          .filter(input, choices, {
            extract: (el) => el.name,
          })
          .map((el) => el.original);
        return results;
      },
    },
  ]);
  spin = logger.spin(`clone ${repos}`);
  git({})
    .clone(repos, dir)
    .then(() => {
      spin.succeed();
    })
    .finally(() => {
      spin.clear();
    });
}
