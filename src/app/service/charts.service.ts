import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const apiKey: string =
  'coinranking0f013a5eb1095253e6e6a80035679a6f67b922d29cc98f09';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-access-token': `${apiKey}`,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'https://api.coinranking.com/v2/coins';

  getCoinsData() {
    return this.http.get(this.baseUrl, httpOptions);
  }
}
