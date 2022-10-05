import fs from 'fs-extra';
import userhome from 'userhome';
import { CONFIG_FILENAME } from '@/const';
export const CONFIG_PATH = userhome(CONFIG_FILENAME);

const presets = {
  CONFIG_PATH,
};

async function getConfigFileContent() {
  const content = await fs.readFile(CONFIG_PATH);
  const obj = JSON.parse(content.toString());
  return obj;
}

export async function getConfigKey(key: string) {
  const isExist = await fs.pathExists(CONFIG_PATH);
  if (isExist) {
    const content = await getConfigFileContent();
    return content[key];
  } else {
    throw new Error('please init first');
  }
}
export async function setConfigKey(key: string, value: string) {
  const isExist = await fs.pathExists(CONFIG_PATH);
  if (isExist) {
    const content = await getConfigFileContent();
    content[key] = value;
    await fs.writeJSON(CONFIG_PATH, content);
    return content;
  } else {
    await fs.writeJSON(CONFIG_PATH, presets);
    return presets;
  }
}

export async function deleteConfigKey(key: string) {
  const isExist = await fs.pathExists(CONFIG_PATH);
  if (isExist) {
    const content = await getConfigFileContent();
    const { [key]: value, ...rest } = content;
    await fs.writeJSON(CONFIG_PATH, rest);
    return key;
  } else {
    throw new Error('please init first');
  }
}
