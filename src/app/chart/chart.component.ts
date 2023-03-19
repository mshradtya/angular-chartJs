import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../service/charts.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  constructor(private service: ChartsService) {}

  resObj: any;
  coinName: any;
  coinPrice: any;
  chart: any;

  ngOnInit(): void {
    this.onGetCoinsData();
  }

  createChart() {
    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.coinName,
        datasets: [
          {
            label: 'Coin Price',
            data: this.coinPrice,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });
  }

  handleResponse(res: Object) {
    this.resObj = res;
    this.coinName = this.resObj.data.coins.map((coins: any) => coins.name);
    this.coinPrice = this.resObj.data.coins.map((coins: any) => coins.price);
    this.createChart();
  }

  onGetCoinsData() {
    this.service.getCoinsData().subscribe({
      next: (res) => this.handleResponse(res),
      error: (err) => console.log(err),
      complete: () => console.log('done getting coins data'),
    });
  }
}
