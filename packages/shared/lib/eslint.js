"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formate = void 0;
const eslint_1 = require("eslint");
// TODO  https://eslint.org/docs/developer-guide/nodejs-api#-eslintlintfilespatterns
/**
 * 根据指定的eslint配置文件,输出格式化后的代码
 */
async function formate(filePath) {
    const eslint = new eslint_1.ESLint({
        fix: true
    });
    const result = await eslint.lintFiles(filePath);
    await eslint_1.ESLint.outputFixes(result);
}
exports.formate = formate;
