"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExcelReader_1 = __importDefault(require("./reader/ExcelReader"));
const Config_1 = __importDefault(require("./Config"));
const Path_1 = __importDefault(require("./Path"));
class ExcelManager {
    static ReadExcels(path) {
        this.configDir = path;
        ExcelReader_1.default.readExportExcel(Config_1.default.Inst.exportFilePath);
        //traverse Config dir
        let dir = path + '/' + Config_1.default.Inst.excelsFolder;
        let excelPathList = Path_1.default.ReaddirSync(dir);
        let sheetList = [];
        for (let excelPath of excelPathList) {
            sheetList = sheetList.concat(ExcelReader_1.default.readExcel(excelPath));
        }
        this.sheetList = sheetList;
    }
    static ExportJson() {
    }
    static ExportTs() {
    }
    static ExportPb() {
    }
    static Copy2Client(fromPath, toPath) {
    }
}
exports.default = ExcelManager;
ExcelManager.configDir = "";
ExcelManager.sheetList = [];
