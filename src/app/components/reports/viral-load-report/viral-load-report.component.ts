import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../../services/data-services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Config } from '../../../config';

@Component({
  selector: 'app-viral-load-report',
  templateUrl: './viral-load-report.component.html',
  styleUrls: ['./viral-load-report.component.scss']
})
export class ViralLoadReportComponent implements OnInit {

  // drop down list values
  public laboratoryFilterValues: any = [];
  public yearFilterValues: any = [];
  public monthFilterValues: any = [
    { key: 1, value: 'Jan' },
    { key: 2, value: 'Feb' },
    { key: 3, value: 'Mar' },
    { key: "4", value: 'Apr' },
    { key: "5", value: 'May' },
    { key: "6", value: 'Jun' },
    { key: "7", value: 'Jul' },
    { key: "8", value: 'Aug' },
    { key: "9", value: 'Sep' },
    { key: "10", value: 'Oct' },
    { key: "11", value: 'Nov' },
    { key: "12", value: 'Dec' },
  ];

  // current value of the filters
  public selectedUser: any = '';
  public selectedLaboratory: any = '';
  public selectedyear: any = '';
  public selectedMonth: any = '';
  // raw dispensation data
  public rawlaboratoryData: any;
  public viralLoadResultData: any[][];
  public loader = false;
  public reportPeriod: any;
  public reportDays: any;
  public technicians: any = [];
  public reasonNumber: any = [];
  public rejectionReason:any=[];
  public specimenNumber:any;
  public testNumber:any;
  public invalidResult;
  static DOWNLOAD_BASE_URL = Config.url + '/v1/report/ViralLoad-export';

  /**
   * Constructor 
   * @param sanitizer
   * @param dataService 
   * @param router 
   */
  constructor(private sanitizer: DomSanitizer, private dataService: DataService, private router: Router) { }

  /**
   * Initialization
   */
  ngOnInit(): void {
    this.getLaboratoryList();
    this.getYearFilterValues();
  }
  /**
* create values for year filter
*/
  getYearFilterValues() {
    let currentYear = new Date().getFullYear();
    for (let year = 2015; year <= currentYear; year++) {
      this.yearFilterValues.push(year);
    }
  }
  /**
   * Download Laboratory list
   */
  getLaboratoryList() {
    this.dataService.getLaboratoryList().subscribe(data => {
      let response: any;
      response = data;
      for (let lab of response.result) {
        this.laboratoryFilterValues = [...this.laboratoryFilterValues, lab.NAME];
      }
    });
  }
  /**
* When filter values changed, update the display
*/
  filterChange() {
    if (!(this.selectedLaboratory && this.selectedyear && this.selectedMonth))
      return;
    this.loader = true;
    this.rawlaboratoryData = [];
    this.reportDays = new Date(this.selectedyear, this.selectedMonth, 0).getDate();
    let monthNames = ["", "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    let month = monthNames[this.selectedMonth];
    this.reportPeriod = this.selectedyear + ' ,' + month;
    this.dataService.getviralLoadLabDetails(this.selectedUser, this.selectedLaboratory, this.selectedyear, this.selectedMonth).subscribe(data => {
      let response: any;
      response = data;
      this.technicians=[];
      let result: any = data;
      
      this.getViralLoadResult(result.data2);
      for (let row of result.data1) {
        this.rawlaboratoryData = row;
        this.technicians.push(row[5]);
      }
     
      this.loader = false;
    }, error => {
      this.loader = false;
    });
  }
  /**
 * create viral load result 
 */
  getViralLoadResult(rawlaboratoryData) {
    this.viralLoadResultData = [];
    this.rejectionReason=[];
    this.viralLoadResultData.push(new Array());
    for (let row of rawlaboratoryData) {
      this.rejectionReason.push({reason:row[7],count:row[8]});
      this.reasonNumber=row[6];
      this.specimenNumber=row[3];
      this.testNumber=row[4];
      this.invalidResult=row[5];
      this.viralLoadResultData[0][0] = 'Target Not Detected (TND)';
      this.viralLoadResultData[0][1] = +row[9];
      this.viralLoadResultData[0][2] = +row[10];
      this.viralLoadResultData[0][3] = +row[11];
      this.viralLoadResultData[0][4] = +row[12];;
      this.viralLoadResultData[0][5] = +row[13];;
      this.viralLoadResultData[0][6] = +row[14];;
      this.viralLoadResultData[0][7] = +row[15];;
      this.viralLoadResultData[0][8] = +row[16];
      this.viralLoadResultData.push(new Array());
      this.viralLoadResultData[1][0] = 'Results < 1000';
      this.viralLoadResultData[1][1] = +row[17];
      this.viralLoadResultData[1][2] = +row[18];
      this.viralLoadResultData[1][3] = +row[19];
      this.viralLoadResultData[1][4] = +row[20];
      this.viralLoadResultData[1][5] = +row[21];
      this.viralLoadResultData[1][6] = +row[22];
      this.viralLoadResultData[1][7] = +row[23];
      this.viralLoadResultData[1][8] = +row[24];
      this.viralLoadResultData.push(new Array());
      this.viralLoadResultData[2][0] = 'Results >= 1000';
      this.viralLoadResultData[2][1] = +row[25];
      this.viralLoadResultData[2][2] = +row[26];
      this.viralLoadResultData[2][3] = +row[27];
      this.viralLoadResultData[2][4] = +row[28];
      this.viralLoadResultData[2][5] = +row[29];
      this.viralLoadResultData[2][6] = +row[30];
      this.viralLoadResultData[2][7] = +row[31];
      this.viralLoadResultData[2][8] = +row[32];
      this.viralLoadResultData.push(new Array());
      this.viralLoadResultData[3][0] = 'Total';
      this.viralLoadResultData[3][1] = this.viralLoadResultData[0][1] + this.viralLoadResultData[1][1] + this.viralLoadResultData[2][1];
      this.viralLoadResultData[3][2] = this.viralLoadResultData[0][2] + this.viralLoadResultData[1][2] + this.viralLoadResultData[2][2];
      this.viralLoadResultData[3][3] = this.viralLoadResultData[0][3] + this.viralLoadResultData[1][3] + this.viralLoadResultData[2][3];
      this.viralLoadResultData[3][4] = this.viralLoadResultData[0][4] + this.viralLoadResultData[1][4] + this.viralLoadResultData[2][4];
      this.viralLoadResultData[3][5] = this.viralLoadResultData[0][5] + this.viralLoadResultData[1][5] + this.viralLoadResultData[2][5];
      this.viralLoadResultData[3][6] = this.viralLoadResultData[0][6] + this.viralLoadResultData[1][6] + this.viralLoadResultData[2][6];
      this.viralLoadResultData[3][7] = this.viralLoadResultData[0][7] + this.viralLoadResultData[1][7] + this.viralLoadResultData[2][7];
      this.viralLoadResultData[3][8] = this.viralLoadResultData[3][4] + this.viralLoadResultData[3][5] + this.viralLoadResultData[3][6] + this.viralLoadResultData[3][7];
    }
  }
  /**
   * Download data content
   * @param type type of file to download. csv, xls or xlsx
   */
  public download(type) {
    let a = document.createElement('a');
    a.href = ViralLoadReportComponent.DOWNLOAD_BASE_URL + '?labname=' + this.selectedLaboratory + '&year=' + this.selectedyear + '&month=' + this.selectedMonth + '&type=' + type;
    a.click();
  }
}