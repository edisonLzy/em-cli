import { defineCommand } from './core/command'; // 会将 defineCommand 定义到 当前模块的exports对象上面
import type { CommandConfig } from './core/command';
import {
  CommandAddCmd,
  CommandAdminConfig,
  CONFIG_PATH,
  getConfigKey,
  setConfigKey,
} from './command';
import ECli from './core';

export {
  defineCommand,
  CommandConfig,
  CONFIG_PATH,
  getConfigKey,
  setConfigKey,
  CommandAddCmd,
  CommandAdminConfig,
};

export default ECli;
