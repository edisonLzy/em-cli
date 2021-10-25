import signale from 'signale';
import readPkg from 'read-pkg';
import shelljs from 'shelljs';
import path from 'path';
import fg from 'fast-glob';
import inquirer from 'inquirer';

function getChoices(dirs: string[]) {
  return dirs.map((dir) => {
    return {
      name: path.basename(dir),
      value: dir,
    };
  });
}
async function getPkgName(dir: string) {
  const { name } = await readPkg({
    cwd: dir,
  });
  return name;
}
function getPkgNames(dirs: string[]) {
  return Promise.all(dirs.map(getPkgName));
}

export async function createLink(workinDir: string) {
  // 匹配当前 cwd下的包
  const pkgs = await fg(`${workinDir}/*`, {
    onlyDirectories: true,
  });
  // 选择 source, target
  const { source, target } = await inquirer.prompt([
    {
      name: 'source',
      type: 'list',
      message: '选择源包',
      choices: getChoices(pkgs),
    },
    {
      name: 'target',
      type: 'list',
      message: '目标包',
      choices: getChoices(pkgs),
      validate: (val, answers) => {
        console.log(val, answers);
        const { source } = answers ?? {};
        if (source === val) {
          return '目标包和源包的地址不能相同';
        }
        return true;
      },
    },
  ]);
  // 获取 包名称
  const [sourceName, targetName] = await getPkgNames([source, target]);
  // 进入 source, target
  shelljs.cd(source);
  shelljs.exec('npm link');
  // 进入 target 进行链接
  shelljs.cd(target);
  shelljs.exec(`npm link ${sourceName}`);
  signale.success(`link ${sourceName} to ${targetName} success`);
}
