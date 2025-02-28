import path from 'path';
import fs from 'fs-extra';
import fg from 'fast-glob';
import ejs from 'ejs';
import { logger } from '@em-cli/shared';
import inquirer from 'inquirer';
import { FileManager } from '@etools/fm';
import { getRepoCacheDir } from '../../utils';
const cacheDir = getRepoCacheDir();

/**
 * 选择模版进行项目创建
 * @param project
 */
function getChoices(dirs: string[]) {
  return dirs.map((dir) => {
    return {
      name: path.basename(dir),
      value: dir,
    };
  });
}

/**
 * @param content 文件内容
 * @return 替换之后的内容
 */
function renderer(content: string, answers: Record<string, any> = {}) {
  return ejs.render(content, answers);
}

/**
 * @param template 模版目录
 */
async function getAnswersByTemplateAsk(
  template: string,
  configFile = 'ask.json'
) {
  const askFilePath = path.join(template, configFile);
  if (fs.pathExistsSync(askFilePath)) {
    const options = await fs.readJSON(askFilePath);
    const answers = await inquirer.prompt(options.inquirer);
    return answers;
  } else {
    logger.warn('please check %s is existed in template', configFile);
  }
}

/**
 *
 * @param filePath
 */
function getRelativePath(from: string, to: string) {
  const relative = path.relative(from, to);
  return relative;
}

/**
 * 排除 ask.json
 * @param template
 * @returns
 */
async function getAllFiles(template: string) {
  let files = await fg(`${template}/**/*`, {
    dot: true,
  });
  files = files.filter((file) => path.basename(file) !== 'ask.json');
  return files;
}

export async function createProjectByTemplate(
  project: string,
  workinDir: string
) {
  const outDir = path.join(workinDir, project);
  const pkgs = await fg(`${cacheDir}/*`, {
    onlyDirectories: true,
  });
  const { templatePath } = await inquirer.prompt([
    {
      name: 'templatePath',
      type: 'list',
      message: 'please select template',
      choices: getChoices(pkgs),
      validate: (val) => {
        if (val) return 'please select template';
        return true;
      },
    },
  ]);
  const answers: any = await getAnswersByTemplateAsk(templatePath);
  const files = await getAllFiles(templatePath);
  const fm = new FileManager({
    base: templatePath,
  });
  for (const file of files) {
    const content = await fs.readFile(file);
    const replaced = renderer(content.toString(), answers);
    const relativePath = getRelativePath(templatePath, file);
    fm.addFile({
      path: relativePath,
      value: replaced,
    });
  }
  await fm.outFile(outDir);
}
