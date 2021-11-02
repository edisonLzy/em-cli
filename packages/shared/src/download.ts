import { promisify } from 'util';
/**
 *  下载github仓库
 *  @description 请确保下载的项目地址是 visibility 是 Public 状态
 *  @example download(`github:edisonLzy/em-template-lib`,dest)
 */
export const download = promisify(require('download-git-repo'));
