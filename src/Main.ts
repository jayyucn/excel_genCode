import ExcelReader from './reader/ExcelReader';
export default  class Main {
    static start() {
        ExcelReader.readExcel('./test/Menu.xlsx');
    }
}

new Main();

