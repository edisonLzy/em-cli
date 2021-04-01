import EventEmitter from 'events';
import { logger, spin } from '../helper';
export default class BaseClass extends EventEmitter {
  static commandInstallFlag: boolean
  // 日志输出
  logSuccess = logger.success
  logError = logger.error
  logWarn = logger.warn
  logInfo = logger.info
  logChalk = logger.chalk()
  // Loading
  loadingStart = spin.start
  loadingEnd = spin.end
  constructor() {
    super();
    this.on('error',e=>{
      this.logError(e);
      process.exit(1);
    });
  }
}
