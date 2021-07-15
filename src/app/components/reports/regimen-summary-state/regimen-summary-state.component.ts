import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../../services/data-services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Config } from '../../../config';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-regimen-summary-state',
  templateUrl: './regimen-summary-state.component.html',
  styleUrls: ['./regimen-summary-state.component.scss'],
  providers: [DatePipe],
})
export class RegimenSummaryStateComponent implements OnInit {

  // drop down list values
  public sacsFilterValues: any = [];
  public facilityFilterValues: any = [];
  public regimenFilterValues: any = [];
  public categoryFilterValues: any = [];
  public statusFilterValues: any = [];
  // current value of the filters
  public selectedUser: any = '';
  public selectedSacs: any = '';
  public selectedFacility: any = '';
  public selectedRegimen: any = '';
  public selectedCategory: any = '';
  public selectedStatus: any = '';
  public registrationStartDate = '';
  public registrationEndDate = '';
  // raw dispensation data
  public rawSummaryData: any;
  public pageNumber=1;
  public dataLoader=false;
  public loader = false;
  static DOWNLOAD_BASE_URL = Config.url + '/v1/report/rss-export';
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
    this.filterChange();
  }
  /**
   * When filter values changed, update the display
   */
  filterChange() {
    this.pageNumber=1;
    this.loader = true;
    let ecncodedFacility=[];
    if (this.selectedFacility && this.selectedFacility.length > 0) {
      for (let facility of this.selectedFacility) {
        ecncodedFacility.push(encodeURIComponent(facility));
      }
    }
    this.dataService.getRegimenSummaryState(this.pageNumber,this.selectedSacs, ecncodedFacility, encodeURIComponent(this.selectedRegimen), this.selectedCategory, this.selectedStatus, this.datePipe.transform(this.registrationStartDate, 'yyyy-MM-dd'), this.datePipe.transform(this.registrationEndDate, 'yyyy-MM-dd')).subscribe(data => {
      let response: any;
      response = data;
      let result: any = data;
      this.sacsFilterValues = result.filters.sacs;
      this.facilityFilterValues = result.filters.facility;
      this.regimenFilterValues = result.filters.regimen;
      this.categoryFilterValues = result.filters.category;
      this.statusFilterValues = result.filters.status;
      this.rawSummaryData = result.data;
      this.config.totalItems=this.rawSummaryData.length;
      this.loader = false;
    }, error => {
      this.loader = false;
    });
  }
  loadMore(){
    this.dataLoader=true;
    this.pageNumber++;
    this.loader = true;
    this.dataService.getRegimenSummaryState(this.pageNumber,this.selectedSacs, this.selectedFacility, encodeURIComponent(this.selectedRegimen), this.selectedCategory, this.selectedStatus, this.datePipe.transform(this.registrationStartDate, 'yyyy-MM-dd'), this.datePipe.transform(this.registrationEndDate, 'yyyy-MM-dd')).subscribe(data => {
      let response: any;
      response = data;
      let result: any = data;
      this.rawSummaryData=this.rawSummaryData.concat(result.data);
      this.loader = false;
      this.dataLoader=false;
    }, error => {
      this.loader = false;
      this.dataLoader=false;
    });
  }
  public download(type) {
    let sacs = '';
    let facility = '';
    let regimen = '';
    let category = '';
    let status = '';
    let ecncodedFacility=[];
    if (this.selectedFacility && this.selectedFacility.length > 0) {
      for (let facility of this.selectedFacility) {
        ecncodedFacility.push(encodeURIComponent(facility));
      }
    }

    if (this.selectedSacs && this.selectedSacs.length > 0) {
      sacs = this.selectedSacs[0];
    }

    if (this.selectedFacility && this.selectedFacility.length > 0) {
      facility = this.selectedFacility[0];
    }
    if (this.selectedRegimen && this.selectedRegimen.length > 0) {
      regimen = this.selectedRegimen[0];
    }
    if (this.selectedCategory && this.selectedCategory.length > 0) {
      category = this.selectedCategory[0];
    }
    if (this.selectedStatus && this.selectedRegimen.length > 0) {
      status = this.selectedRegimen[0];
    }
    let startDate = this.registrationStartDate ? this.datePipe.transform(this.registrationStartDate, 'yyyy-MM-dd') : '';
    let endDate = this.registrationEndDate ? this.datePipe.transform(this.registrationEndDate, 'yyyy-MM-dd') : '';
    let a = document.createElement('a');
    a.href = RegimenSummaryStateComponent.DOWNLOAD_BASE_URL + '?username='+this.selectedUser+'&sacs=' + sacs + '&facility=' + encodeURIComponent(ecncodedFacility.toString()) + '&regimen=' + encodeURIComponent(this.selectedRegimen) + '&category=' + category + '&status=' + status + '&registration_start_date=' + startDate + '&registration_end_date=' + endDate + '&type=' + type;
    a.click();
  }
}
