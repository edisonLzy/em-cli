"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePwd = exports.resolveDirname = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
function resolvePath(base) {
    return function (p) {
        return path_1.default.resolve(base, p);
    };
}
exports.resolveDirname = resolvePath(__dirname);
exports.resolvePwd = resolvePath(process.cwd());
