"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const log_symbols_1 = tslib_1.__importDefault(require("log-symbols"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
class Logger {
    success(msg) {
        console.log(log_symbols_1.default.success, msg);
    }
    error(msg) {
        console.log(log_symbols_1.default.error, chalk_1.default.redBright(msg));
    }
    warn(msg) {
        console.log(log_symbols_1.default.warning, msg);
    }
    info(msg) {
        console.log(log_symbols_1.default.info, msg);
    }
    chalk() {
        return chalk_1.default;
    }
}
exports.default = new Logger();
