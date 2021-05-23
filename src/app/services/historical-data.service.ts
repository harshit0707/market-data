import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { HistoricalDataRequestModel } from '../models/HistoricalDataRequest.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricalDataService {

  constructor(private _http: HttpClient) { }

  getData(data: HistoricalDataRequestModel) {
    // console.log(data);
    const url = this.getURL(data);
    const headers = this.getHeaders();
    this._http.get(url).subscribe(
      (resp) => {
        console.log(resp);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getURL(data: HistoricalDataRequestModel): string {
    let url = 'https://query1.finance.yahoo.com/v7/finance/chart/{symbol}?range={range}&interval={interval}';
    url = url.replace('{symbol}', data.symbol);
    url = url.replace('{range}', data.range);
    url = url.replace('{interval}', data.interval);
    return url;
  }

  getHeaders(): HttpHeaders{
    let headers = new HttpHeaders();
    headers.append('sec-fetch-mode', 'navigate');
    headers.append('Accept', '*');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', '*');
    headers.append('abc', 'abc');
    return headers;
  }
}
