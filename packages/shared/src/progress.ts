/**
 * https://www.npmjs.com/package/progress#usage
 */
import ProgressBar from 'progress';
/**
 * 支持的样式
 * https://www.npmjs.com/package/progress#tokens
 */

export function makeProgress() {
  const total = 100;
  const bar = new ProgressBar('downloading [:bar] :rate/bps :percent :etas', {
    complete: '=',
    incomplete: ' ',
    total: total,
  });
  return {
    start() {
      const timer = setInterval(() => {
        bar.tick(20);
        if (bar.complete) {
          clearInterval(timer);
        }
      }, 100);
    },
    end() {
      bar.curr = total;
    },
  };
}
