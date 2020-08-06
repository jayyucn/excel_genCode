"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = __importDefault(require("xlsx"));
const Sheet_1 = require("../data/Sheet");
const Logger_1 = __importDefault(require("../Logger"));
const Path_1 = __importDefault(require("../Path"));
class ExcelReader {
    static readExcel(filePath) {
        let workbook = xlsx_1.default.readFile(filePath);
        for (let sheetName of workbook.SheetNames) {
            if (sheetName.startsWith('_'))
                continue;
            let workSheet = workbook.Sheets[sheetName];
            let ref = workSheet["!ref"].split(":");
            let str = JSON.stringify(workSheet);
            console.log('=================', workSheet['!ref']);// Object.keys(workSheet));
            Path_1.default.WriteJson('./bin/test.json', str);
        }
        return [];
    }
    static readExportExcel(filePath) {
        let workbook = xlsx_1.default.readFile(filePath);
        if (!workbook)
            Logger_1.default.Error(`${__dirname}:: ${__filename}: file ${filePath} not exist!!!`);
        if (workbook && workbook.SheetNames && workbook.SheetNames.length > 0) {
            let sheetName = workbook.SheetNames[0];
            let workSheet = workbook.Sheets[sheetName];
            let sheet = Sheet_1.ExportSheet.Create(workSheet, sheetName);
            return sheet;
        }
        Logger_1.default.Error(`${__dirname}:: ${__filename}: Read ${filePath} failed!!!`);
        return null;
    }
    isSheetNameCorrect(sheetName) {
        let reg = /([A-Z][a-z]+)+/g;
        if (sheetName.match(reg))
            return true;
        return false;
    }
}
exports.default = ExcelReader;
