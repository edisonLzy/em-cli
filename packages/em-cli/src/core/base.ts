import EventEmitter from 'events';
import { elog } from '@em-cli/shared';
export default class BaseClass extends EventEmitter {
  static commandInstallFlag: boolean;
  constructor() {
    super();
    this.on('error', (e) => {
      elog.error('onError', e);
      process.exit(1);
    });
  }
}
