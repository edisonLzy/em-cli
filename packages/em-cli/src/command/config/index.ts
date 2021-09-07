import { defineCommand } from '@/core/command';
import fs from 'fs-extra';
import userhome from 'userhome';
import { elog } from '@em-cli/shared';
import { getConfigKey, setConfigKey } from './utils';
import { CONFIG_FILENAME, CONFIG_GET, CONFIG_SET } from '../../const';

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
  args: '[action] [key] [value]',
  description: 'maintains ee cli config file',
  async run({ args, optionsArgs }) {
    const [action, key, value] = args;
    if (!action) {
      const content = await initConfigFile();
      // ee config
      elog.info('config = %s', content);
    }
    if (action === CONFIG_GET) {
      // ee config get
      const value = await getConfigKey(key);
      elog.info('%s=%s', key, value);
    }
    if (action === CONFIG_SET) {
      // ee config set key value
      await setConfigKey(key, value);
      elog.info('success set %s in configFile', key);
    }
  },
});
