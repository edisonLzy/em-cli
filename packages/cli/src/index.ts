import ECli, { CommandAddCmd, CommandAdminConfig } from '@em-cli/core';
import CommandInit from '@em-cli/em-plugin-init';
import CommandDev from '@em-cli/em-plugin-dev';
import CommandBuild from '@em-cli/em-plugin-build';
import CommandDeploy from '@em-cli/em-plugin-deploy';
import CommandCreate from '@em-cli/em-plugin-create';
import CommandTemplate from '@em-cli/em-plugin-template';

export function run(isDev: boolean) {
  const eCli = new ECli();
  eCli
    .addCommand(CommandInit)
    .addCommand(CommandDev)
    .addCommand(CommandBuild)
    .addCommand(CommandDeploy)
    .addCommand(CommandCreate)
    .addCommand(CommandAdminConfig)
    .addCommand(CommandTemplate);
  if (isDev) {
    eCli.addCommand(CommandAddCmd);
  }
  eCli.run();
}
