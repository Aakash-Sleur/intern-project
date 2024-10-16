import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

export interface CardDataInterface {
  title: string;
  count: number;
  description: string;
  color: {
    backgroundColor: string;
  };
}

export interface TableContentInterface {
  name: string;
  attendance: {
    present: number;
    absent: number;
  };
}

const tableContent: TableContentInterface[] = [
  {
    name: 'Ichigo',
    attendance: {
      present: 100,
      absent: 0,
    },
  },
  {
    name: 'Uriyu',
    attendance: {
      present: 60,
      absent: 40,
    },
  },
  {
    name: 'Inoue',
    attendance: {
      present: 40,
      absent: 60,
    },
  },
  {
    name: 'Sado',
    attendance: {
      present: 30,
      absent: 70,
    },
  },
  {
    name: 'Rukia',
    attendance: {
      present: 40,
      absent: 60,
    },
  },
  {
    name: 'Renji',
    attendance: {
      present: 40,
      absent: 60,
    },
  },
];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AgCharts,
    MatCardModule,
    MatTableModule,
    MatGridListModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  options: AgChartOptions = {
    container: document.getElementById('myChart'),
    data: [
      { asset: 'Present', amount: tableContent[0].attendance.present },
      { asset: 'Absent', amount: tableContent[0].attendance.absent },
    ],
    title: {
      text: tableContent[0].name,
    },
    series: [
      {
        type: 'pie',
        angleKey: 'amount',
        legendItemKey: 'asset',
      },
    ],
  };

  displayColumns: string[] = ['name', 'present', 'absent', 'view'];

  dataSource = tableContent;

  cardData: CardDataInterface[] = [
    {
      title: 'Orders',
      count: 9090,
      description: 'Total no. of orders',
      color: {
        backgroundColor: '#4cb050',
      },
    },
    {
      title: 'Orders',
      count: 9898,
      description: 'Total no. of orders',
      color: {
        backgroundColor: '#009788',
      },
    },
    {
      title: 'Orders',
      count: 9191,
      description: 'Total no. of orders',
      color: {
        backgroundColor: '#2196f3',
      },
    },
    {
      title: 'Orders',
      count: 9494,
      description: 'Total no. of orders',
      color: {
        backgroundColor: '#3f51b5',
      },
    },
  ];

  trackByFn(index: number, item: any) {
    return item.id;
  }

  viewData(element: TableContentInterface) {
    this.options = {
      ...this.options,
      title: {
        text: element.name,
      },
      data: [
        { asset: 'Present', amount: element.attendance.present },
        { asset: 'Absent', amount: element.attendance.absent },
      ],
    };
  }
}
