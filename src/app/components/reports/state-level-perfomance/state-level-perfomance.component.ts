import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../../services/data-services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Config } from '../../../config';

@Component({
  selector: 'app-state-level-perfomance',
  templateUrl: './state-level-perfomance.component.html',
  styleUrls: ['./state-level-perfomance.component.scss']
})
export class StateLevelPerfomanceComponent implements OnInit {
 // drop down list values
 public districtFilterValues: any = [];
 public districtFilterValuesAnalysis: any = []; 
 public facilityFilterValues: any = [];
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
    {   key: "12", value: 'Dec' },
  ];
 // current value of the filters
 public selectedUser: any = '';
 public selectedDistrict: any = '';
 public selectedFacility: any = '';
 public selectedyear: any = '';
 public selectedMonth: any = '';
 // raw dispensation data
 public rawSummaryData: any;
 public loader = false;
 static DOWNLOAD_BASE_URL = Config.url + '/v1/report/';
public products=[];
public active;
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
  this.getYearFilterValues();
   this.filterChange();
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
  * When filter values changed, update the display
  */
 filterChange() {
   this.loader = true;
   let encodedFacility = [];
   this.dataService.stateLevelReport(this.selectedUser, this.selectedDistrict, this.selectedFacility, this.selectedyear,this.selectedMonth).subscribe(data => {
     this.loader = false;
     let response: any;
     response = data;
     let result: any = data;
     this.districtFilterValues = result.filters.districts;
     this.facilityFilterValues = result.filters.facilities;
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
   let facility = '';
   let district = '';
   let encodedFacility = [];
   let a = document.createElement('a');
   if(this.active==1)
   a.href = StateLevelPerfomanceComponent.DOWNLOAD_BASE_URL + 'NACO-OST-Summary?district=' + this.selectedDistrict + '&facility='+encodeURIComponent(this.selectedFacility)+'&year='+this.selectedyear+'&month='+this.selectedMonth+'&type=' + type;
    else
   a.href = StateLevelPerfomanceComponent.DOWNLOAD_BASE_URL + 'NACO-OST-Analisys?district=' + this.selectedDistrict + '&facility='+encodeURIComponent(this.selectedFacility)+'&year='+this.selectedyear+'&month='+this.selectedMonth+'&type=' + type;
   a.click();
 }
}

