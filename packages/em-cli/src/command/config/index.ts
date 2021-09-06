import { defineCommand } from '@/core/command';
import fs from 'fs-extra';
import path from 'path';
import userhome from 'userhome';
import { CONFIG_FILENAME } from '../../const';
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
  args: '[type]',
  option: [
    ['-k,--key <key>', 'key'],
    ['-v,--value [value]', 'value'],
  ],
  description: 'maintains ee cli config file',
  async run({ args, optionsArgs }) {
    const content = await initConfigFile();
  },
});
