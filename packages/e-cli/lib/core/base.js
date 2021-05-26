"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const events_1 = tslib_1.__importDefault(require("events"));
const shared_1 = require("@ecli/shared");
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
