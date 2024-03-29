import ECli, { CommandAddCmd, CommandAdminConfig } from '@em-cli/core';
import CommandInit from '@em-cli/em-plugin-init';
import CommandDev from '@em-cli/em-plugin-dev';
// import CommandBuild from '@em-cli/em-plugin-build';
import CommandDeploy from '@em-cli/em-plugin-deploy';
import CommandCreate from '@em-cli/em-plugin-create';
import CommandTemplate from '@em-cli/em-plugin-template';
import CommandRenderer from '@em-cli/em-plugin-renderer';
import CommandDebug from '@em-cli/em-plugin-debug';
import CommandGithub from '@em-cli/em-plugin-github';
import CommandYuque from '@em-cli/em-plugin-yuque';

export function run(isDev: boolean) {
  const eCli = new ECli();

  eCli
    .addCommand(CommandInit)
    .addCommand(CommandDev)
    // .addCommand(CommandBuild)
    .addCommand(CommandDeploy)
    .addCommand(CommandCreate)
    .addCommand(CommandAdminConfig)
    .addCommand(CommandTemplate)
    .addCommand(CommandRenderer)
    .addCommand(CommandDebug)
    .addCommand(CommandGithub)
    .addCommand(CommandYuque);
  if (isDev) {
    eCli.addCommand(CommandAddCmd);
  }
  eCli.run();
}
