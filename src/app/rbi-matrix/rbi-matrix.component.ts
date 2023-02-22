import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-rbi-matrix',
  templateUrl: './rbi-matrix.component.html',
  styleUrls: ['./rbi-matrix.component.css']
})
export class RbiMatrixComponent implements OnInit {

    options: any;
   
    colorDataInput:number[] = [0, 0, 1, 1, 0, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 3];

    nColorMax : number = Math.max(...this.colorDataInput);

    constructor() { 
    }

    ngOnInit(): void {
        this.showRisk(this.colorDataInput);
    }

    showRisk(colorData:number[]){
        let xValue = ['Neglilible', 'Minor', 'Moderate', 'Significant'];
        let yValue = ['Very \nUnlikely', 'Unlikely', 'Possible', 'Likely'];  
        let rbiMatrix = ['IV - 72 months', 'IV - 72 months', 'III - 36 months', 'III - 36 months', 
                        'IV - 72 months', 'III - 36 months', 'III - 36 months', 'II - 24 months', 
                        'III - 36 months','III - 36 months', 'II - 24 months', 'II - 24 months', 
                        'III - 36 months', 'II - 24 months', 'II - 24 months', 'I - 12 months'];
        let data = this.getMatrix(colorData, rbiMatrix);
        this.options = {
            tooltip: {
                position: 'top'
            },
            animation: false,
            grid: {
                height: '50%',
                top: '10%'
            },
            xAxis: {
                name: 'Consequence',
                nameLocation: "middle",
                nameTextStyle: {
                    color: 'rgba(255, 255, 255, 0.8)'
                },
                type: 'category',
                data: xValue,
                splitArea: {
                    show: true
                },
                axisLabel: {
                    fontSize: 10,
                    color: 'rgba(255, 255, 255, 0.8)'
                },
                triggerEvent: true
            },
            yAxis: {
                name: 'Occurence',
                nameTextStyle: {
                    color: 'rgba(255, 255, 255, 0.8)'
                },
                type: 'category',
                splitArea: {
                    show: true
                },
                data: yValue,
                axisLabel: {
                    fontSize: 10,
                    rotate: 0,
                    color: 'rgba(255, 255, 255, 0.8)'
                }
            },
            visualMap: [
                {
                    show: true,
                    type: 'continuous',
                    dimension: 2,
                    orient: 'horizontal',
                    left: 'center',
                    min: 0,
                    max: xValue.length - 1,
                    text: ['High risk', 'Low risk'],
                    textStyle: {
                        color: 'white'
                    },
                    calculable: true,
                    inRange: {
                        color: ['green','lightgreen','yellow','orange','red']
                    }
                }
            ],
            series: [{
                name: 'Category:',
                type: 'heatmap',
                data: data,
                tooltip: {
                    trigger: 'item',
                    formatter: function (params: any) {
                        return `${params.seriesName} ${params.data[3]}`;
                    }
                },
                label: {
                    show: false,
                },
            }]
        }
    }

    onChartEvent(event: any, type: string) {
        this.colorDataInput[event.dataIndex] = this.colorDataInput[event.dataIndex] + 1;
        if (this.colorDataInput[event.dataIndex] == this.nColorMax + 1) {
            this.colorDataInput[event.dataIndex] = 0;
        }
        this.showRisk(this.colorDataInput)
    }
    
    zeros(row: number, col: number) { //defining a 2D-array of zeroes
        let outData = [];
        for (let i = 0; i < row; i++) {
            let subarray = [];
            for (let j = 0; j < col; j++) {
                subarray.push(0);
              }
              outData.push(subarray);
        }
        return outData;          
    }

    getMatrix(inDataColor: number[], inDataRbi: any[]) {
        let n = Math.sqrt (inDataColor.length);
        let outData = this.zeros(n * n, n);
        for (let j = 0; j < n; j++) {
            for (let i = 0; i < n; i++) {
                outData[i + j * n] = [j, i, inDataColor[i + j * n], inDataRbi[i + j * n]];
            }
        } 
        return outData;
    }
}