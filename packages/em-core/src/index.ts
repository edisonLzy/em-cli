import { defineCommand } from './core/command'; // 会将 defineCommand 定义到 当前模块的exports对象上面
import {
  CommandAddCmd,
  CommandAdminConfig,
  CONFIG_PATH,
  getConfigKey,
  setConfigKey,
} from './command';
import ECli from './core';
import type { CommandConfig } from './core/command';

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
