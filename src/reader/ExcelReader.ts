import XLSX from 'xlsx'
import FS from 'fs'

export default class ExcelReader {

    static readExcel(fileName: string) {
        let workbook = XLSX.readFile(fileName);
        console.log('workbook = ', workbook);
    }

    static readExportExcel(fileName: string) {
    }
}