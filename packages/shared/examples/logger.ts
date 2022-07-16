import logger from '../src/logger';
const spinner = logger.spin('正在下载中');
setTimeout(() => {
  spinner.color = 'gray';
  spinner.text = 'Loading rainbows';
}, 1000);
