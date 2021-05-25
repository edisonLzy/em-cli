"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.download = void 0;
const util_1 = require("util");
/**
 *  下载github仓库
 *  download(`github:edisonLzy/${templateId}-learn`,target)
 */
exports.download = util_1.promisify(require('download-git-repo'));
