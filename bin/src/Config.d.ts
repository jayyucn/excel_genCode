export default class Config {
    Workspace: string;
    ConfigPath: string;
    GamePath: string;
    /** 自定义数据结构表路径 */
    exportFilePath: string;
    excelsFolder: string;
    JsonPbPath: string;
    TsPath: string;
    private static _Inst;
    static get Inst(): Config;
    constructor();
}
