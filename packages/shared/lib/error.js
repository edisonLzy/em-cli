"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler {
    constructor() {
        process.on('uncaughtException', err => { });
    }
}
exports.default = ErrorHandler;
