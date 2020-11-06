import ExcelReader from './reader/ExcelReader';
import FS from 'fs';
import ExcelManager from './ExcelManager';
export default  class Main {

    
    static Init(genPb: boolean = false) {
        ExcelManager.ReadExcels();
        ExcelManager.ExportJson();
        ExcelManager.ExportTs();
        if(genPb)
            ExcelManager.ExportPb();
        ExcelManager.Copy2Client(Config.ConfigPath,Config.TsPath);
    }
    
    // static start(configPath: string) {
    //     let exportPath = configPath + 'ExportSetting.xlsx';
    //     if(this.checkFile(exportPath))
    //         ExcelReader.readExportExcel(exportPath);
    //     else {
    //         throw new Error("未找到ExportSetting.xlsx");
    //     }
    //     let fileList = FS.readdirSync(configPath + "config");
    //     for(let file of fileList) {
    //         let filePath = configPath + file;
    //         if(this.checkFile(filePath)) {
    //             ExcelReader.readExcel(filePath);
    //         }else
    //             console.warn(`未支持的文件类型, ${filePath}`);
    //     }
    // }

    // private static checkFile(path: string): boolean {
    //     let stat = FS.statSync(path);
    //     if(stat && stat.isFile())
    //         return true
    //     return false        
    // }
}


Main.Init(false);
