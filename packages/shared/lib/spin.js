"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ora_1 = tslib_1.__importDefault(require("ora"));
// spinner.fail() // close -- error icon 
// spinner.succeed() // close -- success icon 
class Spin {
    start(msg) {
        this.ora = ora_1.default(msg + '\n').start();
        return this.ora;
    }
}
exports.default = new Spin();
