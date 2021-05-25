"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formate = void 0;
const tslib_1 = require("tslib");
const eslint_1 = require("eslint");
// TODO  https://eslint.org/docs/developer-guide/nodejs-api#-eslintlintfilespatterns
/**
 * 根据指定的eslint配置文件,输出格式化后的代码
 */
function formate(filePath) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const eslint = new eslint_1.ESLint({
            fix: true
        });
        const result = yield eslint.lintFiles(filePath);
        yield eslint_1.ESLint.outputFixes(result);
    });
}
exports.formate = formate;
