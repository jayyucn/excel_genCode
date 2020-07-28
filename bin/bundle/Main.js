"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExcelReader_1 = __importDefault(require("./reader/ExcelReader"));
class Main {
    static start() {
        console.log('start');
        
        ExcelReader_1.default.readExcel('./test/Menu.xlsx');
    }
}
exports.default = Main;
new Main();
