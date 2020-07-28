import ExcelReader from './reader/ExcelReader';
import FS from 'fs';
export default  class Main {
    static start(configPath: string) {
        ExcelReader.readExportExcel(configPath + 'ExportSetting.xlsx');
        let fileList = FS.readdirSync(configPath + "config");
        for(let file of fileList) {
            
            ExcelReader.readExcel('./test/Menu.xlsx');
        }
    }
}

new Main();

