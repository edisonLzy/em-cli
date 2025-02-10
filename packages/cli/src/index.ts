import ECli, { CommandAddCmd, CommandAdminConfig } from '@em-cli/core';
import CommandInit from '@em-cli/em-plugin-init';
import CommandAI from '@em-cli/em-plugin-ai'

export function run(isDev: boolean) {
  const eCli = new ECli();

  eCli
    .addCommand(CommandInit)
    .addCommand(CommandAdminConfig)
    .addCommand(CommandAI)
  if (isDev) {
    eCli.addCommand(CommandAddCmd);
  }
  eCli.run();
}
