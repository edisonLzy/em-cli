import EventEmitter from 'events';
import { logger } from '@em-cli/shared';
export default class BaseClass extends EventEmitter {
  static commandInstallFlag: boolean;
  constructor() {
    super();
    this.on('error', (e) => {
      logger.error(e);
      process.exit(1);
    });
  }
}
