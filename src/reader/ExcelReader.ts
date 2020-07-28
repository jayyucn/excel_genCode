import XLSX from 'xlsx'

export default class ExcelReader {

    static readExcel(fileName: string) {
        let workbook = XLSX.readFile(fileName);
    }
}