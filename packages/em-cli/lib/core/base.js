"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const shared_1 = require("@em-cli/shared");
class BaseClass extends events_1.default {
    constructor() {
        super();
        // 日志输出
        this.logSuccess = shared_1.logger.success;
        this.logError = shared_1.logger.error;
        this.logWarn = shared_1.logger.warn;
        this.logInfo = shared_1.logger.info;
        this.logChalk = shared_1.logger.chalk();
        // Loading
        this.loadingStart = shared_1.spin.start;
        this.on('error', e => {
            this.logError(e);
            process.exit(1);
        });
    }
}
exports.default = BaseClass;
