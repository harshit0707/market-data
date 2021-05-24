import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HistoricalDataRequestModel } from 'src/app/models/HistoricalDataRequest.model';
import { DownloadDataService } from 'src/app/services/download-data.service';
import { HistoricalDataService } from 'src/app/services/historical-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;

  constructor(private _historicalDataService: HistoricalDataService,
    private _downloadDataService: DownloadDataService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      stockSymbol: new FormControl('')
    })
  }

  getHistoricalData() {
    const symbol = this.form.get('stockSymbol').value;
    const range = '7d';
    const interval = '1m';
    const requestData = new HistoricalDataRequestModel(symbol, range, interval);
    console.log('Get historical data function called');
    this._historicalDataService.getData(requestData).subscribe(
      (resp) => {
          console.log(resp);
          this.downloadData(resp);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  downloadData(data: Object) {
    let newObject = {};
    newObject["timestamp"] = data["chart"]["result"][0]["timestamp"];
    newObject["close"] = data["chart"]["result"][0]["indicators"]["quote"][0]["close"]
    newObject["high"] = data["chart"]["result"][0]["indicators"]["quote"][0]["high"]
    newObject["low"] = data["chart"]["result"][0]["indicators"]["quote"][0]["low"]
    newObject["open"] = data["chart"]["result"][0]["indicators"]["quote"][0]["open"]
    newObject["volume"] = data["chart"]["result"][0]["indicators"]["quote"][0]["volume"]

    this._downloadDataService.downloadFile(newObject, this.form.get('stockSymbol').value);
  }
}
