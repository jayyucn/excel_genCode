"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExcelReader_1 = __importDefault(require("./reader/ExcelReader"));
const fs_1 = __importDefault(require("fs"));
const ExcelManager_1 = __importDefault(require("./ExcelManager"));
const Config_1 = __importDefault(require("./Config"));
class Main {
    static Init(genPb = false) {
        ExcelManager_1.default.ReadExcels(Config_1.default.Inst.ConfigPath);
        ExcelManager_1.default.ExportJson();
        ExcelManager_1.default.ExportTs();
        if (genPb)
            ExcelManager_1.default.ExportPb();
        ExcelManager_1.default.Copy2Client(Config_1.default.Inst.ConfigPath, Config_1.default.Inst.TsPath);
    }
    static start(configPath) {
        let exportPath = configPath + 'ExportSetting.xlsx';
        if (this.checkFile(exportPath))
            ExcelReader_1.default.readExportExcel(exportPath);
        else {
            throw new Error("未找到ExportSetting.xlsx");
        }
        let fileList = fs_1.default.readdirSync(configPath + "config");
        for (let file of fileList) {
            let filePath = configPath + file;
            if (this.checkFile(filePath)) {
                ExcelReader_1.default.readExcel(filePath);
            }
            else
                console.warn(`未支持的文件类型, ${filePath}`);
        }
    }
    static checkFile(path) {
        let stat = fs_1.default.statSync(path);
        if (stat && stat.isFile())
            return true;
        return false;
    }
}
exports.default = Main;
new Main();
