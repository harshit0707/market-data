import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadDataService {

  constructor() { }

  downloadFile(data: Object, filename='data') {
    let csvData = this.ConvertToCSV(data, ['timestamp', 'close','high', 'low', 'open', 'volume']);
    // console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray: Object, headerList: Array<string>) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';

    for (let index in headerList) {
        row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';

    console.log(array);
    let length = array["timestamp"].length;
    for (let i = 0; i < length; i++) {
        let line = '';
        for (let index in headerList) {
          let head = headerList[index];
            line += (array[head][i] + ',');
        }
        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    return str;
  }
}
