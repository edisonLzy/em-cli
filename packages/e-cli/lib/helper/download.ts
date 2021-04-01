import {promisify} from 'util';
/**
 *  下载github仓库
 *  download(`github:edisonLzy/${templateId}-learn`,target)
 */
export const download = promisify(require('download-git-repo'));