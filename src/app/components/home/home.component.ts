import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HistoricalDataRequestModel } from 'src/app/models/HistoricalDataRequest.model';
import { DownloadDataService } from 'src/app/services/download-data.service';
import { HistoricalDataService } from 'src/app/services/historical-data.service';

import * as moment from 'moment/moment';

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
    const range = '1y';
    const interval = '1d';
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
    newObject["date"] = [];
    newObject["time"] = [];
    // newObject["timestamp"] = data["chart"]["result"][0]["timestamp"];
    data["chart"]["result"][0]["timestamp"].forEach(timestamp => {
      newObject["date"].push(moment(timestamp*1000).format('DD/MM/YYYY'));
      newObject["time"].push(moment(timestamp*1000).format('hh:mm A'));
    });
    newObject["close"] = data["chart"]["result"][0]["indicators"]["quote"][0]["close"]
    newObject["high"] = data["chart"]["result"][0]["indicators"]["quote"][0]["high"]
    newObject["low"] = data["chart"]["result"][0]["indicators"]["quote"][0]["low"]
    newObject["open"] = data["chart"]["result"][0]["indicators"]["quote"][0]["open"]
    newObject["volume"] = data["chart"]["result"][0]["indicators"]["quote"][0]["volume"]

    this._downloadDataService.downloadFile(newObject, this.form.get('stockSymbol').value);
  }
}
