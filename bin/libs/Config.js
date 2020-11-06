let workpace = "E:/workspace/GameJJSG2/";
let gamePath = workpace + "client/client/Game/";
let configPath = workpace +"design/Config/";

var Config = {
    exportFilePath: configPath +"/ExportSetting.xlsx",
    TsPath: gamePath +"src/Config",
    excelsFolder: configPath +"Common",
    JsonPbPath: gamePath +"bin/res/config/pb",
    OutputPath: configPath +"ExcelJson/",

    json_str_type: ["string"],
    json_int_type: ["int32", "int64", "uint32", "uint64"],
    json_num_type: ["float64", "float32", "int32", "int64", "uint32", "uint64"],
    baseType: ["bool", "int", "int32", "uint32", "int64", "uint64", "float", "float32", "float64", "string"],
    typeMap: { "long": "int64", "float": "float32", "double": "float64", "boolean": "bool", "int": "int32" },
}
global.Config = Config;
