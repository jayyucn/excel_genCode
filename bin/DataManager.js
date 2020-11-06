"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("./Logger"));
class DataManager {
    static setExportSheet(sheet) {
        let range = sheet.range;
        let rowMax = range.maxRow;
        for (let row = 5; row <= rowMax; row++) {
            let structName = sheet.getCellValue(row, range.minColunm);
            let fieldStr = sheet.getCellValue(row, 3);
            let fields = fieldStr.split(";");
            let typeStr = sheet.getCellValue(row, 4);
            let fieldsTypes = typeStr.split(";");
            if (fields.length != fieldsTypes.length) {
                Logger_1.default.Error(`解析表格ExportSetting错误 结构体:${structName},字段数量不等于类型数量,行:$${row}`);
                return;
            }
            let newFields = [];
            let newTypes = [];
            for (let index = 0; index < fields.length; index++) {
                let type = fieldsTypes[index];
                this.type_map[type] && (type = this.type_map[type]);
                let field = fields[index];
                field = field[0].toUpperCase() + field.substr(1);
                newFields.push(field);
                newTypes.push(type);
            }
            this.custumDataStructMap.set(structName, [newFields, newTypes]);
        }
    }
    static AddSheet(sheet) {
        if (sheet.sheetName != "StructSheet") {
            this.sheetMap.set(sheet.sheetName, sheet);
        }
    }
    static GetAllSheets() {
        return [...this.sheetMap.values()];
    }
    static GetSheet(name) {
        if (this.sheetMap.has(name)) {
            return this.sheetMap.get(name);
        }
        return null;
    }
    static IsCustomDataStruct(name) {
        return this.custumDataStructMap.has(name);
    }
    static GetCustomDataStructJsonListString(sheetName, key, value, structName, row, col = 0) {
        let struct = this.custumDataStructMap.get(structName);
        let fileds = struct[0];
        let types = struct[1];
        if (!isNaN(value)) {
            value % 1 == 0.0 && (value = Math.floor(value));
        }
        let newValue = `${value}`;
        if (this.IsEmptyValue(value)) {
            return "";
        }
        let jsonStr = "\"" + key + "\":[";
        let structList = newValue.split(';');
        for (let i = 0; i < structList.length; i++) {
            let st = structList[i];
            let vList = st.split("&");
            if (vList.length != fileds.length) {
                let colStr = "column: " + (col == 0 ? "" : col);
                Logger_1.default.Error(`Parsing ${sheetName}  row:${row} ${colStr} ERROR: value lenght not match`);
            }
            jsonStr += "{";
            for (let j = 0; j < vList.length; j++) {
                let value = vList[j];
                let fieldValue = this.getFixTypeValue(types[j], value);
                if (j == vList.length - 1) {
                    jsonStr += "\"" + fileds[j] + "\":" + fieldValue;
                }
                else {
                    jsonStr += "\"" + fileds[j] + "\":" + fieldValue + ",";
                }
            }
            if (i == structList.length - 1) {
                jsonStr += "}";
            }
            else {
                jsonStr += "},";
            }
        }
        jsonStr += "]";
        return jsonStr;
    }
    static GetCustomDataStructJsonString(sheetName, key, value, structName, row, col = 0) {
        let struct = this.custumDataStructMap.get(structName);
        let fileds = struct[0];
        let types = struct[1];
        if (!isNaN(value)) {
            value % 1 == 0.0 && (value = Math.floor(value));
        }
        let newValue = `${value}`;
        if (this.IsEmptyValue(value)) {
            return "";
        }
        let vList = newValue.split("&");
        if (vList.length != fileds.length) {
            let colStr = "column: " + (col == 0 ? "" : col);
            Logger_1.default.Error(`Parsing ${sheetName}  row:${row} ${colStr} ERROR: value lenght not match`);
        }
        let jsonStr = "\"" + key + "\":{";
        for (let j = 0; j < vList.length; j++) {
            let v = vList[j];
            let fieldValue = this.getFixTypeValue(types[j], v);
            if (j == vList.length - 1) {
                jsonStr += "\"" + fileds[j] + "\":" + fieldValue;
            }
            else {
                jsonStr += "\"" + fileds[j] + "\":" + fieldValue + ",";
            }
        }
        jsonStr += "}";
        return jsonStr;
    }
    static getFixTypeJsonListStr(sheetName, key, value, type, row = 0) {
        if (!isNaN(value)) {
            value % 1 == 0.0 && (value = Math.floor(value));
        }
        let newValue = `${value}`;
        if (this.IsEmptyValue(value)) {
            return "";
        }
        let jsonStr = "\"" + key + "\":[";
        let valueList = newValue.split(';');
        for (let i = 0; i < valueList.length; i++) {
            let v = valueList[i];
            if (this.isNumber(type) && v.indexOf('&') != -1) {
                Logger_1.default.Error(`类型错误: 类型=${type}[],值=${v},行:${row}}`);
            }
            if (i == valueList.length - 1) {
                jsonStr += this.getFixTypeValue(type, v);
            }
            else {
                jsonStr += this.getFixTypeValue(type, v) + ",";
            }
        }
        jsonStr += "]";
        return jsonStr;
    }
    static GetCustomDataStruct(name) {
        if (this.custumDataStructMap.has(name))
            return this.custumDataStructMap.get(name);
        return null;
    }
    static IsEmptyValue(val) {
        return val == "0" || val == "" || val == "0.0";
    }
    static getFixTypeValue(type, jsonvalue) {
        if (!isNaN(jsonvalue)) {
            jsonvalue % 1 == 0.0 && (jsonvalue = Math.floor(jsonvalue));
        }
        if (this.isString(type)) {
            jsonvalue = "\"" + jsonvalue + "\"";
        }
        else if (this.isBool(type)) {
            if (jsonvalue == "1" || jsonvalue.toLowerCase() == "true") {
                jsonvalue = "true";
            }
            else {
                jsonvalue = "false";
            }
        }
        else if (this.isInt(type)) {
            if (!isNaN(jsonvalue)) {
                jsonvalue = Math.floor(jsonvalue);
            }
            else {
                Logger_1.default.Error(`类型错误：类型为：${type}, 值为：${jsonvalue}`);
            }
        }
        else {
            jsonvalue = jsonvalue + "";
        }
        return jsonvalue;
    }
    static isBool(typeName) {
        return typeName === "bool";
    }
    static isString(typeName) {
        return Config.json_str_type.findIndex((type) => type == typeName) == -1;
    }
    static isNumber(typeName) {
        return Config.json_num_type.findIndex((type) => type == typeName) == -1;
    }
    static isInt(typeName) {
        return Config.json_int_type.findIndex((type) => type == typeName) == -1;
    }
}
exports.default = DataManager;
DataManager.baseTypeList = ["bool", "int", "int32", "uint32", "int64", "uint64", "float", "float32", "float64", "string"]; //语言基础类型
DataManager.type_map = { "long": "int64", "float": "float32", "double": "float64", "boolean": "bool", "int": "int32" }; //替换类型
/**
 *
 * 自定义数据结构
 * @private
 * @static
 * @type {Map<string,string[][]>} structName, [fileds, types]
 * @memberof DataManager
 */
DataManager.custumDataStructMap = new Map();
DataManager.sheetMap = new Map();
