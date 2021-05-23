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
    this._http.get(url, {
        // headers: headers,
        // withCredentials: true
    }).subscribe(
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

  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    // headers = headers.append('sec-fetch-dest', 'document');
    // headers = headers.append('sec-fetch-mode', 'navigate');
    // headers = headers.append('sec-fetch-site', 'none');
    // headers = headers.append('Accept', '*');
    // headers = headers.append('Access-Control-Allow-Origin', '*');
    // headers = headers.append('Access-Control-Allow-Methods', 'HEAD,GET,OPTIONS');
    // headers = headers.append('Access-Control-Allow-Credentials', 'true');
    // headers = headers.append('Access-Control-Allow-Origin', '*');
    // headers = headers.append('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    // headers = headers.append('content-type', 'application/vnd.sun.wadl+xml');
    return headers;
  }
}
