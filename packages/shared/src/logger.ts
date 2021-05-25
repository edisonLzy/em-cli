import logSymbols from 'log-symbols';
import chalk from 'chalk';
class Logger {
  success(msg: string) {
    console.log(logSymbols.success, msg);
  }
  error(msg: string) {
    console.log(logSymbols.error,chalk.redBright(msg));
  }
  warn(msg: string) {
    console.log(logSymbols.warning, msg);
  }
  info(msg: string) {
    console.log(logSymbols.info, msg);
  }
  chalk() {
    return chalk;
  }
}

export default new Logger();
