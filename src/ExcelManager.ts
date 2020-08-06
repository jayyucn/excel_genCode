import ExcelReader from './reader/ExcelReader';
import Config from './Config';
import Path from './Path';
import Sheet from './data/Sheet';
import { ExportSheet } from './data/Sheet';
export default class ExcelManager {

    public static configDir: string = "";
    public static sheetList: Sheet[] = [];

    public static exportSheet: ExportSheet;

    public static ReadExcels(path: string) {
        this.configDir = path;
        ExcelReader.readExportExcel(Config.Inst.exportFilePath);
        
        //traverse Config dir
        let dir = path + '/' + Config.Inst.excelsFolder;
        let excelPathList: string[] = Path.ReaddirSync(dir);
        let sheetList: Sheet[] = [];
        for(let excelPath of excelPathList) {
            sheetList = sheetList.concat(ExcelReader.readExcel(excelPath));
        }
        this.sheetList = sheetList;
    }

    static ExportJson() {

    }

    static ExportTs() {

    }

    static ExportPb() {

    }

    static Copy2Client(fromPath: string, toPath: string) {

    }
    
}