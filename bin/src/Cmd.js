"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumCmd = void 0;
const node_cmd_1 = __importDefault(require("node-cmd"));
const child_process_1 = __importDefault(require("child_process"));
const Logger_1 = __importDefault(require("./Logger"));
let exec = child_process_1.default.exec;
var EnumCmd;
(function (EnumCmd) {
    EnumCmd["Pause"] = "pause";
})(EnumCmd = exports.EnumCmd || (exports.EnumCmd = {}));
class Cmd {
    static runCmd(cmd) {
        node_cmd_1.default.get(cmd, function (err, data, stderr) {
            Logger_1.default.Info('[CMD]: \n', data);
        });
        node_cmd_1.default.run('ls');
    }
    static execute(cmd) {
        Logger_1.default.Info(`[CMD]: ${cmd}`);
        exec(cmd, (error, stdout, stdError) => {
            Logger_1.default.Debug(`${stdout}`);
        });
    }
}
exports.default = Cmd;
