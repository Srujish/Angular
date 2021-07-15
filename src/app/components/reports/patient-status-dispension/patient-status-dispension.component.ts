import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../../services/data-services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Config } from '../../../config';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-patient-status-dispension',
  templateUrl: './patient-status-dispension.component.html',
  styleUrls: ['./patient-status-dispension.component.scss'],
  providers: [DatePipe],
})
export class PatientStatusDispensionComponent implements OnInit {
  // drop down list values
  public statusFilterValues: any = [];
  public categoryFilterValues: any = [];
  public startDate: any;
  public endDate: any;
  // current value of the filters
  public selectedUser: any = '';
  public selectedStatus: any = '';
  public selectedCategory: any = '';

  // raw dispensation data
  public rawSummaryData: any;
  public loader = false;
  public active;
  static DOWNLOAD_BASE_URL = Config.url + '/v1/report/';
  public products = [];
  public page = 1;
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
  }

  /**
   * When filter values changed, update the display
   */
  getFilter() {
    this.loader = true;
    this.dataService.patientStatusDispensationFIlter(this.selectedStatus, this.selectedCategory).subscribe(data => {
      this.loader = false;
      let response: any;
      response = data;
      let result: any = data;

      this.statusFilterValues = result.filters.status;
      this.categoryFilterValues = result.filters.category;
    }, error => {
      this.loader = false;
    });
  }

  /**
   * When filter values changed, update the display
   */
  filterChange() {
    if (!this.startDate || !this.endDate)
      return;
    this.loader = true;
    if (this.active == 1) {
      this.dataService.publicpatientStatusDispensationRegistration(this.selectedStatus, this.selectedCategory, this.datePipe.transform(this.startDate, 'yyyy-MM-dd'), this.datePipe.transform(this.endDate, 'yyyy-MM-dd')).subscribe(data => {
        let response: any;
        response = data;
        let result: any = data;
        this.rawSummaryData = result.data;
        this.loader = false;
      }, error => {
        this.loader = false;
      });
    } else if (this.active == 2) {
      this.dataService.patientStatusDispensationInitiation(this.selectedStatus, this.selectedCategory, this.datePipe.transform(this.startDate, 'yyyy-MM-dd'), this.datePipe.transform(this.endDate, 'yyyy-MM-dd')).subscribe(data => {
        let response: any;
        response = data;
        let result: any = data;
        this.rawSummaryData = result.data;
        this.loader = false;
      }, error => {
        this.loader = false;
      });
    } else {
      this.dataService.patientStatusDispensationStatus(this.selectedStatus, this.selectedCategory, this.datePipe.transform(this.startDate, 'yyyy-MM-dd'), this.datePipe.transform(this.endDate, 'yyyy-MM-dd')).subscribe(data => {
        let response: any;
        response = data;
        let result: any = data;
        this.rawSummaryData = result.data;
        this.loader = false;
      }, error => {
        this.loader = false;
      });
    }

  }
  tabChange(tab) {
    if (this.active != tab) {
      this.selectedStatus = '';
      this.selectedCategory = '';
      this.startDate = '';
      this.endDate = '';
      this.rawSummaryData = [];
    }
  }
  /**
   * Download data content
   * @param type type of file to download. csv, xls or xlsx
   */

  public download(type) {
    let facility = '';
    let district = '';
    let a = document.createElement('a');
    if (this.active == 1)
      a.href = PatientStatusDispensionComponent.DOWNLOAD_BASE_URL + 'psdr-registration-export?status=' + this.selectedStatus + '&category=' + this.selectedCategory + '&start_date=' + this.datePipe.transform(this.startDate, 'yyyy-MM-dd') + '&end_date=' + this.datePipe.transform(this.endDate, 'yyyy-MM-dd') + '&type=' + type;
    else if (this.active == 2)
      a.href = PatientStatusDispensionComponent.DOWNLOAD_BASE_URL + 'psdr-initiation-export?status=' + this.selectedStatus + '&category=' + this.selectedCategory + '&start_date=' + this.datePipe.transform(this.startDate, 'yyyy-MM-dd') + '&end_date=' + this.datePipe.transform(this.endDate, 'yyyy-MM-dd') + '&type=' + type;
    else
      a.href = PatientStatusDispensionComponent.DOWNLOAD_BASE_URL + 'psdr-status-export?status=' + this.selectedStatus + '&category=' + this.selectedCategory + '&start_date=' + this.datePipe.transform(this.startDate, 'yyyy-MM-dd') + '&end_date=' + this.datePipe.transform(this.endDate, 'yyyy-MM-dd') + '&type=' + type;

    a.click();
  }
}

