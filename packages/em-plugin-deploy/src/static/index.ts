import path from 'path';
import simpleGit from 'simple-git';
import inquirer from 'inquirer';
import fg from 'fast-glob';
import fs from 'fs-extra';
import signale from 'signale';
import globalConfig from './config';
import { formateContent } from './formate';

const git = simpleGit();

/**
 * 目前只匹配 md 文件
 * @param workinDir
 */
async function getFileChoice(workinDir: string) {
  const files = await fg(`${workinDir}/*.md`, {
    ignore: ['node_modules'],
    onlyFiles: true,
  });
  return files.map((file) => {
    return {
      name: path.basename(file),
      value: {
        name: path.parse(file).name,
        dir: file,
      },
    };
  });
}

/**
 * commit信息
 * @param files
 * @returns
 */
function getCommitMsg(
  files: {
    name: string;
    dir: string;
  }[]
) {
  return files.map((it) => it.name).join(',');
}

/**
 * 获取仓库
 * @param remote
 * @param param
 */
async function fetchRemote(remote: string, { cacheDir }: typeof globalConfig) {
  signale.pending('开始 -- 缓存远程仓库到本地');
  try {
    const repoName = path.parse(remote).name;
    const dir = path.join(cacheDir, repoName);
    if (await fs.pathExists(dir)) {
      await git.cwd(dir);
      await git.pull();
      signale.success('更新仓程仓库到本地');
    } else {
      await git.clone(remote, dir);
      signale.success('缓存远程仓库到本地');
    }
    return dir;
  } catch (e) {
    signale.error(`缓存失败: ${e}`);
  }
}

async function uploadFileToContent(
  files: {
    name: string;
    dir: string;
  }[],
  cachePath: string,
  { storeFileDir }: typeof globalConfig
) {
  //适配 Gatsby
  const fullPath = path.join(cachePath, storeFileDir);
  for await (const { name, dir } of files) {
    const filename = path.join(fullPath, name, 'index.md');
    const content = await (await fs.readFile(dir)).toString();
    signale.pending('导入文件:' + dir);
    await fs.ensureFile(filename);
    await fs.writeFile(filename, formateContent(content, name));
    signale.success('文件写入成功:' + filename);
  }
}

export async function syncToGithub(
  cachePath: string,
  files: {
    name: string;
    dir: string;
  }[]
) {
  signale.pending('正在推送代码到远程仓库');
  try {
    await git.cwd(cachePath);
    await git.add('./*');
    await git.commit(`feat: ${getCommitMsg(files)}`);
    await git.push();
    signale.success('推送成功');
  } catch (e) {
    signale.error('推送失败', e);
    process.exit(1);
  }
}

export async function deployStatic(workinDir: string) {
  const fileChoice = await getFileChoice(workinDir);
  const { remote, files } = await inquirer.prompt([
    {
      name: 'files',
      message: '选择需要上传的文件',
      type: 'checkbox',
      choices: fileChoice,
      validate: (val) => {
        return val.length !== 0 || '请选择需要上传的文件';
      },
    },
    {
      name: 'remote',
      type: 'input',
      message: '请输入远程仓库地址',
      default: 'https://github.com/edisonLzy/em-note.git',
      validate: (val) => {
        return val.length !== 0 || '请输入远程仓库地址';
      },
    },
  ]);
  const cachePath = await fetchRemote(remote, globalConfig);
  await uploadFileToContent(files, cachePath!, globalConfig);
  await syncToGithub(cachePath!, files);
}
