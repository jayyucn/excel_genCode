"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevel = void 0;
const Cmd_1 = __importStar(require("./Cmd"));
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
        const msg = '\u001b[96m\u001b[1mLove fast-xml-parser? Check \u001b[32mhttps://amitkumargupta.work \u001b[96m\u001b[1mfor more projects and contribution.\u001b[0m\n';

        console.log(msg);
        // console.log.apply(this,args);
    }
    static Warn(...args) {
        if (Logger.logLevel > LogLevel.Warn) {
            return;
        }
        console.warn.apply(this, args);
    }
    static Error(...args) {
        console.log.apply(this, args);
        Cmd_1.default.runCmd(Cmd_1.EnumCmd.Pause);
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
