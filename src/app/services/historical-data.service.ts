import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HistoricalDataRequestModel } from '../models/HistoricalDataRequest.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoricalDataService {

  proxyURL = 'https://thingproxy.freeboard.io/fetch/';
  constructor(private _http: HttpClient) { }

  getData(data: HistoricalDataRequestModel): Observable<any> {
    const url = this.getURL(data);
    return this._http.get(url);
  }

  getURL(data: HistoricalDataRequestModel): string {
    let url = 'https://query1.finance.yahoo.com/v7/finance/chart/{symbol}?range={range}&interval={interval}';
    url = url.replace('{symbol}', data.symbol);
    url = url.replace('{range}', data.range);
    url = url.replace('{interval}', data.interval);
    url = this.proxyURL + url;
    return url;
  }
}
