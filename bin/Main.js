"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExcelManager_1 = __importDefault(require("./ExcelManager"));
class Main {
    static Init(genPb = false) {
        ExcelManager_1.default.ReadExcels();
        ExcelManager_1.default.ExportJson();
        ExcelManager_1.default.ExportTs();
        if (genPb)
            ExcelManager_1.default.ExportPb();
        ExcelManager_1.default.Copy2Client(Config.ConfigPath, Config.TsPath);
    }
}
exports.default = Main;
Main.Init(false);
