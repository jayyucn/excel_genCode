export default class Config {
    public Workspace: string = "../../../";
    public ConfigPath: string = "";
    public GamePath: string = "./bin/res";

    /** 自定义数据结构表路径 */
    public exportFilePath: string = "";
    public excelsFolder: string = "";

    public JsonPbPath: string = "";
    public TsPath: string = "";

    private static _Inst: Config;
    static get Inst(): Config {
        if(!this._Inst)
            this._Inst = new Config();
        return this._Inst;
    }

    constructor() {
        this.ConfigPath = this.Workspace + "design/Config";
        this.GamePath = this.Workspace + "client/client/Game";
        this.JsonPbPath = this.GamePath + "/bin/res/config/pb";
        this.TsPath = this.GamePath + "/src/Config";
        this.exportFilePath = this.ConfigPath + "ExportSetting.xlsx";
        this.excelsFolder = "Common";
    }
}