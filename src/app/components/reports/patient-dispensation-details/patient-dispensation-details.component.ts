import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../../services/data-services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Config } from '../../../config';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-patient-dispensation-details',
  templateUrl: './patient-dispensation-details.component.html',
  styleUrls: ['./patient-dispensation-details.component.scss'],
  providers: [DatePipe],
})
export class PatientDispensationDetailsComponent implements OnInit {

  // drop down list values
  public sacsFilterValues: any = [];
  public facilityFilterValues: any = [];
  public stateFilterValues: any = [];
  // current value of the filters
  public selectedUser: any = '';
  public selectedSacs: any = '';
  public selectedFacility: any = '';
  public selectedState: any = '';
  public registrationStartDate = '';
  public registrationEndDate = '';
  // raw dispensation data
  public rawSummaryData: any;
  public pageNumber=1;
  public dataLoader=false;
  public loader = false;
  public total=[];
  page=1;
  static DOWNLOAD_BASE_URL = Config.url + '/v1/report/pdd-export';
  config={
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: 0
  };
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
  pageChanged(event){
    this.config.currentPage = event;
  }
  ngOnInit(): void {
    this.getFilter();
  }
  /**
   * When filter values changed, update the display
   */
  filterChange() {
    if(!this.selectedSacs || !this.registrationStartDate || !this.registrationEndDate || this.selectedFacility.length<=0)
    return;
    this.loader = true;
    let ecncodedFacility=[];
    if (this.selectedFacility && this.selectedFacility.length > 0) {
      for (let facility of this.selectedFacility) {
        ecncodedFacility.push(encodeURIComponent(facility));
      }
    }
    this.dataService.patientDispensationDetails(this.pageNumber,encodeURIComponent(this.selectedSacs),ecncodedFacility, this.datePipe.transform(this.registrationStartDate, 'yyyy-MM-dd'), this.datePipe.transform(this.registrationEndDate, 'yyyy-MM-dd')).subscribe(data => {
      let response: any;
      response = data;
      let result: any = data;
      this.rawSummaryData = result.data;
      this.config.totalItems=this.rawSummaryData.length;
      this.loader = false;
    }, error => {
      this.loader = false;
    });
  }

  getFilter(){
        this.loader = true;
    this.dataService.patientDispensationDetailsFIlter(encodeURIComponent(this.selectedSacs),encodeURIComponent(this.selectedFacility)).subscribe(data => {
      let response: any;
      response = data;
      let result: any = data;
      this.sacsFilterValues = result.filters.sacs;
      this.facilityFilterValues = result.filters.facilities;
      this.stateFilterValues = result.filters.state;
      this.loader = false;
    }, error => {
      this.loader = false;
    });
  }

  public download(type) {
    let ecncodedFacility=[];
    if (this.selectedFacility && this.selectedFacility.length > 0) {
      for (let facility of this.selectedFacility) {
        ecncodedFacility.push(encodeURIComponent(facility));
      }
    }
    let a = document.createElement('a');
    a.href = PatientDispensationDetailsComponent.DOWNLOAD_BASE_URL + '?username='+this.selectedUser+'&sacs=' + encodeURIComponent(this.selectedSacs) + '&facility=' + encodeURIComponent(ecncodedFacility.toString()) + '&start_date=' + this.datePipe.transform(this.registrationStartDate, 'yyyy-MM-dd') + '&end_date=' + this.datePipe.transform(this.registrationEndDate, 'yyyy-MM-dd') + '&type=' + type;
    a.click();
  }
}
