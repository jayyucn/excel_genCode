"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor() {
        this.Workspace = "../../../";
        this.ConfigPath = "";
        this.GamePath = "./bin/res";
        /** 自定义数据结构表路径 */
        this.exportFilePath = "";
        this.excelsFolder = "";
        this.JsonPbPath = "";
        this.TsPath = "";
        this.ConfigPath = this.Workspace + "design/Config";
        this.GamePath = this.Workspace + "client/client/Game";
        this.JsonPbPath = this.GamePath + "/bin/res/config/pb";
        this.TsPath = this.GamePath + "/src/Config";
        this.exportFilePath = this.ConfigPath + "ExportSetting.xlsx";
        this.excelsFolder = "Common";
    }
    static get Inst() {
        if (!this._Inst)
            this._Inst = new Config();
        return this._Inst;
    }
}
exports.default = Config;
