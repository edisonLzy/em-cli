import os from 'os';
import signale from 'signale';
import ora from 'ora';
import chalk from 'chalk';
import terminal from 'terminal-kit';
import { downloadImg } from '../download';

const tips = 'em-cli';
class Logger extends signale.Signale {
  constructor(scope = chalk.blueBright(tips)) {
    super({
      scope,
      types: {
        await: {
          badge: '🚗',
          color: 'blueBright',
          label: 'processing...',
        },
        star: {
          badge: '🍇',
          color: 'cyan',
          label: 'Json',
        },
        note: {
          badge: '🍎',
          color: 'cyan',
          label: 'Array',
        },
      },
    });
  }
  json(data: Record<string, any>, log = true) {
    const keys = Object.keys(data);
    let content = '';
    if (keys.length === 0) {
      content = 'empty';
    } else {
      content = Object.entries(data)
        .map((item, idx) => {
          const [key, value] = item;
          return `${idx + 1}. ${key} : ${chalk.green(value)}`;
        })
        .join(os.EOL);
    }
    if (!log) return content;
    this.star(`
    ${os.EOL}${content}
    `);
  }
  array(arr: any[], tips = '', log = true) {
    let content = '';
    if (arr.length === 0) {
      content = 'empty';
    } else {
      content = arr
        .map((it, idx) => `${idx + 1}. ${chalk.green(it)}`)
        .join(os.EOL);
    }
    if (!log) return content;
    this.note(`${tips}
    ${os.EOL}${content}
    `);
  }
  async img(url: string) {
    // TODO
    if (/^https?:\/\//.test(url)) {
      const localFile = await downloadImg(url);
      terminal.terminal.drawImage(localFile);
      return;
    }
    terminal.terminal.drawImage(url);
  }
  spin(text: string) {
    const spin = ora({
      text: text,
      color: 'gray',
    }).start();
    return spin;
  }
}
const logger = new Logger();
logger.config({
  displayTimestamp: false,
});

export default logger;
