import { Listr } from 'listr2';
import { getConfigKey } from '@em-cli/core';
import { download, logger } from '@em-cli/shared';
import chalk from 'chalk';
import { TEMPLATE_CACHE_KEY } from '../../constant';
import { repoCacheDir, getDirnameByRemoteUrl } from '../../utils';
interface UpdateTemplateOptions {
  updateAll: boolean;
}
interface UpdateContext extends UpdateTemplateOptions {
  templates: string[];
}

async function getTemplatesChoices() {
  const templates = await getConfigKey(TEMPLATE_CACHE_KEY);
  const arr: string[] = JSON.parse(templates ?? '[]');
  return arr;
}

export async function updateTemplate(op: UpdateTemplateOptions) {
  const tasks = new Listr<UpdateContext>([
    {
      title: 'get local templates',
      skip: (ctx) => {
        const { updateAll } = ctx;
        return updateAll;
      },
      task: async (ctx, task) => {
        const templateChoices = await getTemplatesChoices();
        const selectTemplate = await task.prompt([
          {
            type: 'MultiSelect',
            name: 'templates',
            message: '🚀 选择需要更新的模板',
            choices: templateChoices,
          },
        ]);
        ctx.templates = selectTemplate;
      },
    },
    {
      title: 'update template in local',
      task: async (ctx, task) => {
        const { templates = [] } = ctx;
        if (templates.length === 0) {
          task.title = `🤔️ ${chalk.redBright(
            'without template need to update'
          )}`;
          return;
        }
        await Promise.all(
          templates.map((template) => {
            const dirname = getDirnameByRemoteUrl(template);
            return download(template, dirname);
          })
        );
        task.title = `success update template in ${chalk.greenBright(
          repoCacheDir
        )}
        ${logger.array(templates, '', false)}
        `;
      },
    },
  ]);

  await tasks.run({
    updateAll: op.updateAll,
    templates: [],
  });
}
