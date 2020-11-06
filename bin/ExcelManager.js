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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Fse = __importStar(require("fs-extra"));
const DataManager_1 = __importDefault(require("./DataManager"));
const Logger_1 = __importDefault(require("./Logger"));
const Path_1 = __importDefault(require("./Path"));
const ExcelReader_1 = __importDefault(require("./reader/ExcelReader"));
class ExcelManager {
    static ReadExcels() {
        let exportPath = Config.exportFilePath;
        ExcelReader_1.default.readExportExcel(exportPath);
        //traverse Config dir
        let commonDir = Config.excelsFolder;
        let excelPathList = Path_1.default.ReaddirSync(commonDir);
        for (let excelPath of excelPathList) {
            ExcelReader_1.default.readExcel(excelPath);
        }
    }
    static ExportJson() {
        let clientStr = "{\n";
        let serverStr = "{\n";
        let sheets = DataManager_1.default.GetAllSheets();
        Logger_1.default.Info("---------导出json文件：");
        let globalSheet = DataManager_1.default.GetSheet("Global");
        let globalJsonString = this.ExportGlobalToJson(globalSheet);
        if (globalJsonString != "") {
            clientStr += globalJsonString;
            serverStr += globalJsonString;
        }
        for (let sheet of sheets) {
            if (sheet.sheetName == " Global") {
                continue;
            }
            let jsonStr = this.ExportSheetToJson(sheet);
            if (jsonStr != "") {
                clientStr += jsonStr;
                serverStr += jsonStr;
            }
        }
        clientStr += "\n}\n";
        serverStr += "\n}\n";
        Fse.writeFileSync(Config.OutputPath + "clientConfig.json", clientStr, { encoding: "utf-8" });
        Fse.writeFileSync(Config.OutputPath + "serverConfig.json", serverStr, { encoding: "utf-8" });
        Logger_1.default.Info(" 导出json成功！");
    }
    static ExportTs() {
    }
    static ExportPb() {
    }
    static Copy2Client(fromPath, toPath) {
    }
    static ExportGlobalToJson(globalSheet) {
        let jsonLine = "";
        for (let row = 1; row < globalSheet.range.maxRow; row++) {
            let name = globalSheet.getCellValue(row, 2);
            let typeValue = globalSheet.getCellValue(row, 3);
            let valValue = globalSheet.getCellValue(row, 4);
            typeValue = typeValue.trim();
            name = name.trim();
            let tmpType = "";
            let tmpJsonStr = "";
            if (Config.typeMap[typeValue]) {
                typeValue = Config.typeMap[typeValue];
            }
            if (typeValue.endsWith("[]")) {
                tmpType = typeValue.substr(0, typeValue.length - 2);
                if (Config.typeMap[tmpType]) {
                    tmpType = Config.typeMap[tmpType];
                }
                if (DataManager_1.default.IsCustomDataStruct(tmpType)) {
                    tmpJsonStr = DataManager_1.default.GetCustomDataStructJsonListString(globalSheet.sheetName, name, valValue, tmpType, row);
                    if (tmpJsonStr != "") {
                        row != 1 && (jsonLine = jsonLine + ",");
                        jsonLine += tmpJsonStr;
                    }
                }
                else if (Config.baseType.indexOf(tmpType) != -1) {
                    tmpJsonStr = DataManager_1.default.getFixTypeJsonListStr(globalSheet.sheetName, name, valValue, tmpType, row);
                    if (tmpJsonStr != "") {
                        row != 1 && (jsonLine = jsonLine + ",");
                        jsonLine += tmpJsonStr;
                    }
                }
                else {
                    Logger_1.default.Error(`类型错误:global表找不到类型:${typeValue},行:${row}`);
                }
            }
            else if (DataManager_1.default.IsCustomDataStruct(typeValue)) {
                tmpJsonStr = DataManager_1.default.GetCustomDataStructJsonString(globalSheet.sheetName, name, valValue, typeValue, row);
                if (tmpJsonStr != "") {
                    row != 1 && (jsonLine = jsonLine + ",");
                    jsonLine += tmpJsonStr;
                }
            }
            else if (Config.baseType.indexOf(typeValue) != -1) {
                row != 1 && (jsonLine = jsonLine + ",");
                tmpJsonStr = DataManager_1.default.getFixTypeValue(typeValue, valValue);
                jsonLine = jsonLine + "\"" + name + "\":" + tmpJsonStr;
            }
            else {
                Logger_1.default.Error(`类型错误:global表找不到类型:${typeValue},行:${row}`);
            }
        }
        jsonLine = "\t\"Global\":{" + jsonLine + "}";
        return jsonLine;
    }
    static ExportSheetToJson(sheet) {
        let jsonLine = "";
        return jsonLine;
    }
}
exports.default = ExcelManager;
