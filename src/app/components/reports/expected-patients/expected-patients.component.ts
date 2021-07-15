import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../../services/data-services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Config } from '../../../config';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-expected-patients',
  templateUrl: './expected-patients.component.html',
  styleUrls: ['./expected-patients.component.scss'],
  providers: [DatePipe]
})
export class ExpectedPatientsComponent implements OnInit {
// drop down list values
public roleFilterValues: any = [];

// current value of the filters
public selectedUser: any = '';
public selectedRole: any = '';
public startDate = '';
public endDate = '';
// raw dispensation data
public rawSummaryData: any;
public loader = false;
static DOWNLOAD_BASE_URL = Config.url + '/v1/report/';
public products=[];
public active;
public minDate;
public page=1;
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
  this.getFilter();
  this.minDate=new Date();
}
/**
 * filter values
 */
getFilter(){
  this.loader = true;
  this.dataService.expectedPatientsFilter().subscribe(data => {
    this.loader = false;
    let response: any;
    response = data;
    let result: any = data;
    this.roleFilterValues = result.filters.facilities;
  }, error => {
    this.loader = false;
  });
}
tabChange(){
  this.selectedRole='';
  this.startDate='';
  this.endDate='';
  this.rawSummaryData=[];
}
/**
 * When filter values changed, update the display
 */
filterChange() {
  if(!this.startDate || !this.endDate)
  return;
  this.page=1;
  this.loader = true;
  this.rawSummaryData=[];
  this.products=[];
  let type;
  this.dataService.expectedPatients(this.selectedUser, this.active, this.selectedRole,this.datePipe.transform(this.startDate, 'yyyy-MM-dd'), this.datePipe.transform(this.endDate, 'yyyy-MM-dd')).subscribe(data => {
    this.loader = false;
    let response: any;
    response = data;
    let result: any = data;
    this.rawSummaryData = result.data;
  }, error => {
    this.loader = false;
  });
}
/**
 * Download data content
 * @param type type of file to download. csv, xls or xlsx
 */
public download(type) {
 // if(!this.selectedFacility || !this.selectedDistrict || !this.selectedState || !this.selectedFacilityType)
 // return;
  let encodedSelectedProductList = [];
  let role=this.selectedRole?this.selectedRole:'';
  let startDate = this.startDate ? this.datePipe.transform(this.startDate, 'yyyy-MM-dd') : '';
  let endDate = this.endDate ? this.datePipe.transform(this.endDate, 'yyyy-MM-dd') : '';
  let a = document.createElement('a');
  if(this.active==1)
  a.href = ExpectedPatientsComponent.DOWNLOAD_BASE_URL + 'epr-export?username=' + this.selectedUser  + '&facility=' + role+ '&visit_start_date=' + startDate + '&visit_end_date=' + endDate+'&type='+type;
  else
  a.href = ExpectedPatientsComponent.DOWNLOAD_BASE_URL + 'expected-visit-export?username=' + this.selectedUser  + '&facility=' + role+ '&visit_start_date=' + startDate + '&visit_end_date=' + endDate+'&type='+type;
  a.click();
}
}

