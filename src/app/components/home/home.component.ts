import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HistoricalDataRequestModel } from 'src/app/models/historicalDataRequest.model';
import { HistoricalDataService } from 'src/app/services/historical-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;

  constructor(private _historicalDataService: HistoricalDataService) { }

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
    this._historicalDataService.getData(requestData);
  }
}
