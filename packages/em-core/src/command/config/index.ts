import fs from 'fs-extra';
import userhome from 'userhome';
import { logger } from '@em-cli/shared';
import pMap from 'p-map';
import { getConfigKey, setConfigKey, deleteConfigKey } from './utils';
import { CONFIG_FILENAME } from '../../const';
import { defineCommand } from '../../core/command';

export { getConfigKey, setConfigKey };
/**
 * 该命令用来管理全局的配置文件
 * .eeconf.json
 *  ee config : 获取配置文件信息
 *  ee config get key: 获取指定key的值
 *  ee config set key value: 添加配置
 */
export const CONFIG_PATH = userhome(CONFIG_FILENAME);
async function initConfigFile() {
  const isExist = await fs.pathExists(CONFIG_PATH);
  if (isExist) {
    const content = await fs.readFile(CONFIG_PATH);
    return JSON.parse(content.toString());
  } else {
    const presets = {
      CONFIG_PATH,
    };
    await fs.writeJSON(CONFIG_PATH, presets);
    return presets;
  }
}
export default defineCommand({
  id: 'config',
  description: 'maintains ee cli config file',
  subCommands: [
    {
      id: 'get',
      args: '<key>',
      description: '获取指定 key 的配置',
      async run({ args }) {
        const [key] = args;
        const value = await getConfigKey(key);
        logger.success('%s = %s', key, value);
      },
    },
    {
      id: 'set',
      args: '<key> <value>',
      description: 'set a value to config',
      async run({ args }) {
        const [key, value] = args;
        await setConfigKey(key, value);
        logger.success('success set %s in configFile', key);
      },
    },
    {
      id: 'delete',
      args: '<keys...>',
      description: 'delete key in config',
      async run({ args }) {
        const [keys] = args;
        await pMap(keys, deleteConfigKey, {
          concurrency: 1,
        });
        logger.success('success delete %s in configFile', keys);
      },
    },
  ],
  async run({ args, optionsArgs }) {
    // 含有子命令不会执行
    const content = await initConfigFile();
    logger.json(content);
  },
});
