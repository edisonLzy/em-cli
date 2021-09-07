import npmlog from 'npmlog';

const head = 'em-cli';

const info = npmlog.info;
npmlog.info = function (...args: any[]) {
  return Reflect.apply(info, null, [head, ...args]);
} as typeof info;
export default npmlog;
