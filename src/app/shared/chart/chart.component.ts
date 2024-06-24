import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
Chart.register(...registerables);
import { SharedModule } from '../shared.module';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface ChartDate{
  count: number,
  date: string
}

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements AfterViewInit {
  constructor(public dialogRef: MatDialogRef<ChartComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ){}
  @ViewChild('chartCanvas')
  chartCanvas!: ElementRef;
  chart: any;

  ngAfterViewInit() {
    console.log(this.data)
    let formattedDates = this.data.date.map((dateStr: string | number | Date) => {
      let date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    });
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: formattedDates,
        datasets: [{
          label: this.data.colLabel,
          backgroundColor: 'rgba(42, 145, 21, 1)',
          borderColor: 'rgba(49, 172, 24, 0.2)',
          data: this.data.count,
          pointHoverBorderWidth: 2,
          pointHoverRadius: 5
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                var label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += Math.round(context.parsed.y * 100) / 100;
                return label;
              }
            }
          }
        }
      }
    });    
  }    
}
