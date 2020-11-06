import {ExportSheet} from "./data/Sheet";
import SheetData from './data/SheetData';
import Logger from './Logger';
import {isNumber} from "util";

export default class DataManager {
    private static baseTypeList = ["bool","int","int32","uint32","int64","uint64","float","float32","float64","string"] //语言基础类型
    public static type_map = {"long": "int64","float": "float32","double": "float64","boolean": "bool","int": "int32"} //替换类型
    /**
     *
     * 自定义数据结构
     * @private
     * @static
     * @type {Map<string,string[][]>} structName, [fileds, types]
     * @memberof DataManager
     */
    private static custumDataStructMap: Map<string,string[][]> = new Map<string,[]>();
    private static sheetMap: Map<string, SheetData> = new Map<string, SheetData>();
    
    static setExportSheet(sheet: SheetData) {
        let range = sheet.range;
        let rowMax = range.maxRow;
        for(let row = 5; row <= rowMax; row++) {
            let structName = sheet.getCellValue(row,range.minColunm);
            let fieldStr: string = sheet.getCellValue(row,3);
            let fields = fieldStr.split(";");
            let typeStr: string = sheet.getCellValue(row,4);
            let fieldsTypes = typeStr.split(";");
            if(fields.length != fieldsTypes.length) {
                Logger.Error(`解析表格ExportSetting错误 结构体:${structName},字段数量不等于类型数量,行:$${row}`);
                return;
            }
            let newFields: string[] = [];
            let newTypes: string[] = [];
            for(let index = 0; index < fields.length; index++) {
                let type = fieldsTypes[index];
                this.type_map[type] && (type = this.type_map[type]);
                let field = fields[index];
                field = field[0].toUpperCase() + field.substr(1);
                newFields.push(field);
                newTypes.push(type);
            }
            this.custumDataStructMap.set(structName, [newFields, newTypes])
        }
    }

    public static AddSheet(sheet: SheetData) {
        if(sheet.sheetName != "StructSheet") {
            this.sheetMap.set(sheet.sheetName, sheet);
        }
    }

    public static GetAllSheets() {
        return [...this.sheetMap.values()];
    }
    
    public static GetSheet(name: string) {
        if(this.sheetMap.has(name)) {
            return this.sheetMap.get(name);
        }
        return null;
    }

    public static IsCustomDataStruct(name: string) {
        return this.custumDataStructMap.has(name);
    }
    public static GetCustomDataStructJsonListString(sheetName: string, key: string,value: any,structName: string, row: number, col: number = 0) {
        let struct =  this.custumDataStructMap.get(structName);
        let fileds = struct[0];
        let types = struct[1];
        if(!isNaN(value)) {
            value % 1 == 0.0 && (value = Math.floor(value));
        }
        let newValue = `${value}`;
        if(this.IsEmptyValue(value)) {
            return "";
        }
        let jsonStr = "\"" + key + "\":[";
        let structList = newValue.split(';');
        for(let i = 0; i < structList.length; i++) {
            let st = structList[i];
            let vList = st.split("&");
            if(vList.length != fileds.length) {
                let colStr = "column: "+ (col == 0?"": col);
                Logger.Error(`Parsing ${sheetName}  row:${row} ${colStr} ERROR: value lenght not match`);
            }
            jsonStr += "{";
            for(let j = 0;j < vList.length;j++) {
                let value = vList[j];
                let fieldValue = this.getFixTypeValue(types[j], value);
                if(j == vList.length-1) {
                    jsonStr += "\"" + fileds[j] + "\":" + fieldValue
                }else {
                    jsonStr += "\"" + fileds[j] + "\":" + fieldValue + ","
                }
            }
            if(i == structList.length-1) {
                jsonStr += "}"

            }else {
                jsonStr += "},"
            }
        }
        jsonStr += "]";
        return jsonStr;
    }

    public static GetCustomDataStructJsonString(sheetName: string,key: string,value: any,structName: string,row: number,col: number = 0) {
        let struct = this.custumDataStructMap.get(structName);
        let fileds = struct[0];
        let types = struct[1];
        if(!isNaN(value)) {
            value % 1 == 0.0 && (value = Math.floor(value));
        }
        let newValue = `${value}`;
        if(this.IsEmptyValue(value)) {
            return "";
        }
        let vList = newValue.split("&");
        if(vList.length != fileds.length) {
            let colStr = "column: " + (col == 0 ? "" : col);
            Logger.Error(`Parsing ${sheetName}  row:${row} ${colStr} ERROR: value lenght not match`);
        }
        let jsonStr = "\"" + key + "\":{"
        for(let j = 0;j < vList.length;j++) {
            let v = vList[j];
            let fieldValue = this.getFixTypeValue(types[j],v);
            if(j == vList.length - 1) {
                jsonStr += "\"" + fileds[j] + "\":" + fieldValue
            } else {
                jsonStr += "\"" + fileds[j] + "\":" + fieldValue + ","
            }
        }
        jsonStr += "}"
        return jsonStr;
    }

    public static getFixTypeJsonListStr(sheetName: string,key: string,value: any, type: string,row: number = 0) {
        if(!isNaN(value)) {
            value % 1 == 0.0 && (value = Math.floor(value));
        }
        let newValue = `${value}`;
        if(this.IsEmptyValue(value)) {
            return "";
        }
        let jsonStr = "\"" + key + "\":[";
        let valueList = newValue.split(';');
        for(let i = 0;i < valueList.length;i++) {
            let v = valueList[i];
            if(this.isNumber(type) && v.indexOf('&') != -1) {
                Logger.Error(`类型错误: 类型=${type}[],值=${v},行:${row}}`);
            }
            if(i == valueList.length-1) {
                jsonStr += this.getFixTypeValue(type, v);
            }else {
                jsonStr += this.getFixTypeValue(type,v)+",";
            }
        }
        jsonStr += "]";
        return jsonStr;
    }

    public static GetCustomDataStruct(name: string) {
        if(this.custumDataStructMap.has(name))
            return this.custumDataStructMap.get(name);
        return null;
    }


    private static IsEmptyValue(val: string) {
        return val =="0"||val==""||val=="0.0";
    }

    public static getFixTypeValue(type: string,jsonvalue: any) {
        if(!isNaN(jsonvalue)) {
            jsonvalue % 1 == 0.0 && (jsonvalue = Math.floor(jsonvalue));
        }
        if(this.isString(type)) {
            jsonvalue = "\"" + jsonvalue + "\"";
        }else if(this.isBool(type)) {
            if(jsonvalue == "1" || jsonvalue.toLowerCase() == "true") {
                jsonvalue = "true";
            }else {
                jsonvalue = "false";
            }
        }else if(this.isInt(type)) {
            if(!isNaN(jsonvalue)) {
                jsonvalue = Math.floor(jsonvalue);
            }else {
                Logger.Error(`类型错误：类型为：${type}, 值为：${jsonvalue}`);
            }
        }else {
            jsonvalue = jsonvalue+"";
        }
        return jsonvalue;
    }

    private static isBool(typeName: string): boolean {
        return typeName === "bool";
    }

    private static isString(typeName: string): boolean {
        return Config.json_str_type.findIndex((type) => type == typeName) == -1;
    }

    private static isNumber(typeName: string): boolean {
        return Config.json_num_type.findIndex((type) => type == typeName) == -1;
    }

    private static isInt(typeName: string): boolean {
        return Config.json_int_type.findIndex((type) => type == typeName) == -1;
    }

}