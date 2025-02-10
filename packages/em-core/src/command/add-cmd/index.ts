import path from 'path';
import { render } from 'ejs';
import fs from 'fs-extra';
import { pathHelper, logger } from '@em-cli/shared';
import { defineCommand } from '@/core/command';

const { __dirname } = pathHelper.getDirnameAndFilename();
const context = path.resolve(__dirname, '../../../');

function renderTemplate(commandName: string) {
  const templatePath = path.join(context, 'templates/cmd.ejs');
  const templateEjs = fs.readFileSync(templatePath).toString();
  return render(templateEjs, {
    commandName,
  });
}

function outputFile(content: string, filePath: string, commandName: string) {
  fs.ensureFileSync(filePath);
  fs.writeFileSync(filePath, content);
  logger.success(filePath, '输出文件'); // 输出文件
  const commandEntryPath = path.join(context, './src/command/index.ts');
  const commandEntry = fs.readFileSync(commandEntryPath).toString();
  const exportStatement = `export { default as Command${toFirstWordsUpperCase(
    commandName
  )} } from './${commandName}'`;
  if (commandEntry.indexOf(exportStatement) !== -1) {
    logger.error('file existed', `${commandName} is already existed`);
    return;
  }
  const outputContent = `${commandEntry} \n ${exportStatement}`;
  fs.writeFileSync(commandEntryPath, outputContent);
  logger.success(commandEntryPath, '替换文件'); // 替换文件
  logger.success(`成功生成命令 ${commandName}`);
}

function toFirstWordsUpperCase(str: string) {
  return str.replace(/\b\w/g, function (th) {
    return th.toUpperCase();
  });
}

export default defineCommand({
  id: 'add-cmd',
  args: '<commandName>',
  description: 'quick add cli command',
  async run({ args, optionsArgs }) {
    const [commandName] = args;
    const content = renderTemplate(commandName);
    outputFile(
      content,
      path.join(context, './src/command', commandName, 'index.ts'),
      commandName
    );
  },
});
