"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCommand = void 0;
const tslib_1 = require("tslib");
const base_1 = tslib_1.__importDefault(require("./base"));
class BaseCommand extends base_1.default {
    constructor() {
        super(...arguments);
        this.option = [];
        this.args = '';
        this.description = '';
        // 别名
        this.alias = '';
        this.examples = [];
    }
    disable() {
        return false;
    }
}
exports.BaseCommand = BaseCommand;
BaseCommand.installed = false;
