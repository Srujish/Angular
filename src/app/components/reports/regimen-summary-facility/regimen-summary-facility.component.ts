import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../../services/data-services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Config } from '../../../config';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-regimen-summary-facility',
  templateUrl: './regimen-summary-facility.component.html',
  styleUrls: ['./regimen-summary-facility.component.scss'],
  providers: [DatePipe],
})
export class RegimenSummaryFacilityComponent implements OnInit {

  // drop down list values
  public stateFilterValues: any = [];
  public districtFilterValues: any = [];
  public facilityFilterValues: any = [];
  public categoryFilterValues: any = [];
  public regimenFilterValues: any = [];

  // current value of the filters
  public selectedUser: any = '';
  public selectedState: any = '';
  public selectedDistrict: any = '';
  public selectedFacility: any = '';
  public selectedRegimen: any = '';
  public selectedCategory: any = '';
  public registrationStartDate = '';
  public registrationEndDate = '';
  // raw dispensation data
  public rawSummaryData: any;
  public loader = false;
  static DOWNLOAD_BASE_URL = Config.url + '/v1/report/rsf-export';
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
    this.filterChange();
  }
  /**
   * When filter values changed, update the display
   */
  filterChange() {
    this.loader = true;
    this.page=1;
    this.dataService.getRegimenSummaryFacility(this.selectedUser,this.selectedState, this.selectedDistrict, this.selectedFacility, encodeURIComponent(this.selectedRegimen), this.selectedCategory, this.datePipe.transform(this.registrationStartDate, 'dd-MM-yyyy'),this.datePipe.transform(this.registrationEndDate, 'dd-MM-yyyy')).subscribe(data => {
      let response: any;
      response = data;
      let result: any = data;
      this.stateFilterValues = result.filters.state;
      this.districtFilterValues = result.filters.district;
      this.facilityFilterValues = result.filters.facility;
      this.categoryFilterValues = result.filters.category;
      this.regimenFilterValues = result.filters.regimen;
      this.rawSummaryData = result.data;
      this.loader = false;
    }, error => {
      this.loader = false;
    });
  }
  /**
   * Download data content
   * @param type type of file to download. csv, xls or xlsx
   */
  public download(type) {
    let encodedSelectedProductList = [];
    let startDate = this.registrationStartDate ? this.datePipe.transform(this.registrationStartDate, 'dd-MM-yyyy') : '';
    let endDate = this.registrationEndDate ? this.datePipe.transform(this.registrationEndDate, 'dd-MM-yyyy') : '';
    let a = document.createElement('a');
    a.href = RegimenSummaryFacilityComponent.DOWNLOAD_BASE_URL + '?username='+this.selectedUser+'&state=' + this.selectedState + '&district=' + this.selectedDistrict + '&facility=' + this.selectedFacility + '&regimen=' + encodeURIComponent(this.selectedRegimen) + '&category=' + this.selectedCategory + '&registration_start_date=' + startDate + '&registration_end_date=' + endDate + '&type=' + type;
    a.click();
  }
}