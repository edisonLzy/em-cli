"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCommand = void 0;
const base_1 = __importDefault(require("./base"));
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
