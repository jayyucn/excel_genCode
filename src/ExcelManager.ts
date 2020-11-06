import * as Fse from 'fs-extra';
import SheetData from './data/SheetData';
import DataManager from './DataManager';
import Logger from './Logger';
import Path from './Path';
import ExcelReader from './reader/ExcelReader';
export default class ExcelManager {

    public static ReadExcels() {
        let exportPath = Config.exportFilePath;
        ExcelReader.readExportExcel(exportPath);
        //traverse Config dir
        let commonDir = Config.excelsFolder;
        let excelPathList: string[] = Path.ReaddirSync(commonDir);
        for(let excelPath of excelPathList) {
            ExcelReader.readExcel(excelPath)
        }
    }

    static ExportJson() {
        let clientStr = "{\n"
        let serverStr = "{\n"
        let sheets = DataManager.GetAllSheets();
        Logger.Info("---------导出json文件：");
        let globalSheet =  DataManager.GetSheet("Global");
        let globalJsonString = this.ExportGlobalToJson(globalSheet);
        if(globalJsonString != "") {
            clientStr += globalJsonString;
            serverStr += globalJsonString;
        }
        for(let sheet of sheets) {
            if(sheet.sheetName == " Global") {
                continue;
            }
            let jsonStr = this.ExportSheetToJson(sheet);
            if(jsonStr != "") {
                clientStr += jsonStr;
                serverStr += jsonStr;
            }
        }
        clientStr += "\n}\n"
        serverStr += "\n}\n"
        Fse.writeFileSync(Config.OutputPath + "clientConfig.json",clientStr,{encoding: "utf-8"});
        Fse.writeFileSync(Config.OutputPath + "serverConfig.json",serverStr,{encoding: "utf-8"});
        Logger.Info(" 导出json成功！")
    }

    static ExportTs() {

    }

    static ExportPb() {

    }

    static Copy2Client(fromPath: string, toPath: string) {

    }

    private static ExportGlobalToJson(globalSheet: SheetData) {
        let jsonLine = "";
        for(let row = 1;row < globalSheet.range.maxRow;row++) {
            let name: string = globalSheet.getCellValue(row,2);
            let typeValue: string = globalSheet.getCellValue(row,3);
            let valValue: string = globalSheet.getCellValue(row,4);
            typeValue = typeValue.trim();
            name = name.trim();
            let tmpType = "";
            let tmpJsonStr = "";
            if(Config.typeMap[typeValue]) {
                typeValue = Config.typeMap[typeValue]
            }
            if(typeValue.endsWith("[]")) {
                tmpType = typeValue.substr(0,typeValue.length - 2);
                if(Config.typeMap[tmpType]) {
                    tmpType = Config.typeMap[tmpType]
                }
                if(DataManager.IsCustomDataStruct(tmpType)) {
                    tmpJsonStr = DataManager.GetCustomDataStructJsonListString(globalSheet.sheetName,name,valValue,tmpType,row);
                    if(tmpJsonStr != "") {
                        row != 1 && (jsonLine = jsonLine + ",");
                        jsonLine += tmpJsonStr;
                    }
                } else if(Config.baseType.indexOf(tmpType) != -1) {
                    tmpJsonStr = DataManager.getFixTypeJsonListStr(globalSheet.sheetName,name,valValue,tmpType,row);
                    if(tmpJsonStr != "") {
                        row != 1 && (jsonLine = jsonLine + ",");
                        jsonLine += tmpJsonStr;
                    }
                } else {
                    Logger.Error(`类型错误:global表找不到类型:${typeValue},行:${row}`);
                }
            } else if(DataManager.IsCustomDataStruct(typeValue)) {
                tmpJsonStr = DataManager.GetCustomDataStructJsonString(globalSheet.sheetName,name,valValue,typeValue,row);
                if(tmpJsonStr != "") {
                    row != 1 && (jsonLine = jsonLine + ",");
                    jsonLine += tmpJsonStr;
                }
            } else if(Config.baseType.indexOf(typeValue) != -1) {
                row != 1 && (jsonLine = jsonLine + ",");
                tmpJsonStr = DataManager.getFixTypeValue(typeValue,valValue);
                jsonLine = jsonLine + "\"" + name + "\":" + tmpJsonStr;
            } else {
                Logger.Error(`类型错误:global表找不到类型:${typeValue},行:${row}`);
            }
        }
        jsonLine = "\t\"Global\":{" + jsonLine + "}"
        return jsonLine;
    }

    private static ExportSheetToJson(sheet: SheetData): string {
        let jsonLine = "";

        return jsonLine;
    }
    
}