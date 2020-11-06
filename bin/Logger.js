"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Debug"] = 0] = "Debug";
    LogLevel[LogLevel["Info"] = 1] = "Info";
    LogLevel[LogLevel["Warn"] = 2] = "Warn";
    LogLevel[LogLevel["Error"] = 3] = "Error";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
class Logger {
    static Debug(...args) {
        if (Logger.logLevel > LogLevel.Debug) {
            return;
        }
        console.log.apply(this, args);
    }
    static Info(...args) {
        if (Logger.logLevel > LogLevel.Info) {
            return;
        }
        console.log(args);
        // console.log.apply(this,args);
    }
    static Warn(...args) {
        if (Logger.logLevel > LogLevel.Warn) {
            return;
        }
        console.warn.apply(this, args);
    }
    static Error(...args) {
        console.error.apply(this, args);
        // Cmd.runCmd(EnumCmd.Pause);
    }
    static SetLogLevel(level) {
        Logger.logLevel = level;
    }
    static GetLogLevel() {
        return Logger.logLevel;
    }
}
exports.default = Logger;
Logger.logLevel = LogLevel.Debug;
