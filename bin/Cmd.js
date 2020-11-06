"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumCmd = void 0;
const node_cmd_1 = require("node-cmd");
const child_process_1 = require("child_process");
const Logger_1 = require("./Logger");
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
