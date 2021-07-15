import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../../services/data-services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Config } from '../../../config';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-ictc-usage-report',
  templateUrl: './ictc-usage-report.component.html',
  styleUrls: ['./ictc-usage-report.component.scss'],
  providers: [DatePipe],
})
export class IctcUsageReportComponent implements OnInit {


  // drop down list values
  public stateFilterValues: any = [];
  public districtFilterValues: any = [];

  // current value of the filters
  public selectedUser: any = '';
  public selectedState: any = '';
  public selectedDistrict: any = '';
  public registrationStartDate = '';
  public registrationEndDate = '';
  // raw dispensation data
  public rawUsageData: any;
  public loader = false;
  public pageNumber = 1;
  static DOWNLOAD_BASE_URL = Config.url + '/v1/report/ictcu-export';
  public page=1;
  public total=[];
  /**
 * Constructor
 * @param sanitizer
 * @param dataService 
 * @param router 
 */
  constructor(private sanitizer: DomSanitizer, private dataService: DataService, private router: Router, public datePipe: DatePipe) { }
  /**
   * Initialization
   */
  ngOnInit(): void {

    this.filterChange();
  }
  /**
  * When a filter value has changed, update the display
  */
  filterChange() {
    this.loader = true;
    this.page=1;
    this.dataService.getICTCUsage(this.selectedUser, this.selectedState, this.selectedDistrict, this.datePipe.transform(this.registrationStartDate, 'yyyy-MM-dd'), this.datePipe.transform(this.registrationEndDate, 'yyyy-MM-dd')).subscribe(data => {
      let response: any;
      response = data;
      let result: any = data;
      this.stateFilterValues = result.filters.state;
      this.districtFilterValues = result.filters.district;
      this.rawUsageData = result.data;
      this.grandTotal();
      this.loader = false;
    }, error => {
      this.loader = false;
    });

  }
  /**
 * Download content
 * 
 * @param type type of download either csv, xls, xlsx
 */
  public download(type) {
    let state = '';
    let district = '';
    if (this.selectedState && this.selectedState.length > 0) {
      state = this.selectedState[0];
    }
    if (this.selectedDistrict && this.selectedDistrict.length > 0) {
      district = this.selectedDistrict[0];
    }
    let startDate = this.registrationStartDate ? this.datePipe.transform(this.registrationStartDate, 'yyyy-MM-dd') : '';
    let endDate = this.registrationEndDate ? this.datePipe.transform(this.registrationEndDate, 'yyyy-MM-dd') : '';
    let a = document.createElement('a');
    a.href = IctcUsageReportComponent.DOWNLOAD_BASE_URL + '?username='+this.selectedUser+'&state=' + state + '&district=' + district + '&registration_start_date=' + startDate + '&registration_end_date=' + endDate + '&type=' + type;
    a.click();
  }
  /**
* calculate total of row items
* 
* @param row of usage items
*/
  public getUsageTotal(row) {
    return Number(row[4]) + Number(row[5]) + Number(row[6]) + Number(row[7]) + Number(row[8]) + Number(row[9]) + Number(row[10]) + Number(row[11]) + Number(row[12]) + Number(row[13]);
  }
  public grandTotal(){
    this.total[0]=0;
    this.total[1]=0;
    this.total[2]=0;
    this.total[3]=0;
    this.total[4]=0;
    this.total[5]=0;
    this.total[6]=0;
    this.total[7]=0;
    this.total[8]=0;
    this.total[9]=0;
    this.total[10]=0;
    for(let row of this.rawUsageData){
      this.total[0]= this.total[0]+Number(row[4]);
      this.total[1]= this.total[1]+Number(row[5]);
      this.total[2]+= Number(row[6]);
      this.total[3]+= Number(row[7]);
      this.total[4]+= Number(row[8]);
      this.total[5]+= Number(row[9]);
      this.total[6]+= Number(row[10]);
      this.total[7]+= Number(row[11]);
      this.total[8]+= Number(row[12]);
      this.total[9]+= Number(row[13]);
      this.total[10]+=Number(row[4]) + Number(row[5]) + Number(row[6]) + Number(row[7]) + Number(row[8]) + Number(row[9]) + Number(row[10]) + Number(row[11]) + Number(row[12]) + Number(row[13]);
    }
    
  }
}