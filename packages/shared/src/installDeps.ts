/**
 * 安装依赖
 */

import execa from 'execa';
import { makeProgress } from './progress';
const { start, end } = makeProgress();
/**
 * 安装依赖
 * @param opt
 */
export async function install(...opt: string[]) {
  start();
  try {
    await execa('npm', ['i', ...opt]);
  } catch (e) {
    console.log(e);
  }
  end();
}
