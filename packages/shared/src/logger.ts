import logSymbols from 'log-symbols';
import chalk from 'chalk';
import readline from 'readline';
import {stopSpinner} from './spin';
import stripAnsi from 'strip-ansi';
const format = (label:string, msg:string) => {
  return msg.split('\n').map((line, i) => {
    return i === 0
      ? `${label} ${line}`
      : line.padStart(stripAnsi(label).length + line.length + 1);
  }).join('\n');
};

const chalkTag = (msg:string) => chalk.bgBlackBright.white.dim(` ${msg} `);


export const log = (msg = '', tag = '',output = true) => {
  tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg);
};

export const info = (msg = '', tag = '',output = true) => {
  const _m = format(chalk.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''), msg);
  output && console.error(_m);
  return _m;
};

export const done = (msg = '', tag = '',output = true) => {
  const _m = format(chalk.bgGreen.black(' DONE ') + (tag ? chalkTag(tag) : ''), msg);
  output && console.error(_m);
  return _m;
};

export const warn = (msg = '', tag = '',output = true) => {
  const _m = format(chalk.bgYellow.black(' WARN ') + (tag ? chalkTag(tag) : ''), chalk.yellow(msg));
  output && console.error(_m);
  return _m;
};

export const error = (msg = '', tag = '',output = true) => {
  stopSpinner();
  const _m = format(chalk.bgRed(' ERROR ') + (tag ? chalkTag(tag) : ''), chalk.red(msg));
  output && console.error(_m);
  return _m;
};

export const clearConsole = (title:string ='') => {
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows);
    console.log(blank);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    if (title) {
      console.log(title);
    }
  }
};

