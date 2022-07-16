import { promisify } from 'util';
import path from 'path';
import fs from 'fs-extra';
import os from 'os';
import imageDownload from 'image-downloader';
/**
 *  下载github仓库
 *  @description 请确保下载的项目地址是 visibility 是 Public 状态
 *  @example download(`github:edisonLzy/em-template-lib`,dest)
 */
export const download = promisify(require('download-git-repo'));

export const downloadImg = async (url: string) => {
  const dest = path.resolve(os.homedir(), 'shared/download/cache/icon.png');
  const result = await imageDownload.image({
    url,
    dest: dest,
    extractFilename: true,
  });

  return `${result.filename}`;
};
