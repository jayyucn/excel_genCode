"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = __importDefault(require("xlsx"));
class ExcelReader {
    static readExcel(fileName) {
        let workbook = xlsx_1.default.readFile(fileName);
        console.log('workbook = ', workbook);
    }
}
exports.default = ExcelReader;
