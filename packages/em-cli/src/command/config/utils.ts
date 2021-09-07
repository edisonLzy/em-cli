import { CONFIG_PATH } from './index';
import fs from 'fs-extra';

const presets = {
  CONFIG_PATH,
};

export async function getConfigKey(key: string) {
  const isExist = await fs.pathExists(CONFIG_PATH);
  if (isExist) {
    const content = await fs.readFile(CONFIG_PATH);
    const obj = JSON.parse(content.toString());
    return obj[key];
  } else {
    throw new Error('please init first');
  }
}
export async function setConfigKey(key: string, value: string) {
  const isExist = await fs.pathExists(CONFIG_PATH);
  if (isExist) {
    const content = await fs.readFile(CONFIG_PATH);
    const obj = JSON.parse(content.toString());
    obj[key] = value;
    await fs.writeJSON(CONFIG_PATH, obj);
    return obj;
  } else {
    await fs.writeJSON(CONFIG_PATH, presets);
    return presets;
  }
}
