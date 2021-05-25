"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterDir = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
function filterDir(dirs, base) {
    // 过滤无效的目录，文件
    const validateDir = dirs.reduce((acc, cur) => {
        const fullPath = path_1.default.join(base, cur);
        const stat = fs_extra_1.default.statSync(fullPath);
        if (stat.isDirectory()) {
            acc.push(fullPath);
        }
        return acc;
    }, []);
    return validateDir;
}
exports.filterDir = filterDir;
