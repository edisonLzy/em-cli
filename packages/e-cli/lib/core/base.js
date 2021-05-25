"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const events_1 = tslib_1.__importDefault(require("events"));
const cli_shared_1 = require("@lizhiyu/cli-shared");
class BaseClass extends events_1.default {
    constructor() {
        super();
        // 日志输出
        this.logSuccess = cli_shared_1.logger.success;
        this.logError = cli_shared_1.logger.error;
        this.logWarn = cli_shared_1.logger.warn;
        this.logInfo = cli_shared_1.logger.info;
        this.logChalk = cli_shared_1.logger.chalk();
        // Loading
        this.loadingStart = cli_shared_1.spin.start;
        this.on('error', e => {
            this.logError(e);
            process.exit(1);
        });
    }
}
exports.default = BaseClass;
