import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../../services/data-services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Config } from '../../../config';
import { SampleReportComponent } from '../sample-report/sample-report.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'patient-dispensation-summary',
  templateUrl: './patient-dispensation-summary.component.html',
  styleUrls: ['./patient-dispensation-summary.component.scss'],
  providers: [DatePipe],
})
export class PatientDispensationSummary implements OnInit {
  // drop down list values
  public stateFilterValues: any = [];
  public districtFilterValues: any = [];
  public facilityFilterValues: any = [];
  public productFilterValues: any = [];
  // current value of the filters
  public selectedUser: any = '';
  public selectedState: any = '';
  public selectedDistrict: any = '';
  public selectedFacility: any = '';
  public selectedProducts: any = '';
  public dispenseStartDate = '';
  public dispenseEndDate = '';
  // raw dispensation data
  public rawDispensationData: any;
  public dispensationDates: any = [];
  public dispensationProducts: any = [];
  public dispensationData: any = [];
  public dispensationTable: any = [];
  public loader = false;
  static DOWNLOAD_BASE_URL = Config.url + '/v1/report/pds-export';
  public page=1;
  /**
   * Constructor
   * @param sanitizer
   * @param dataService 
   * @param router 
   */
  constructor(private sanitizer: DomSanitizer, private dataService: DataService, private router: Router, public datePipe: DatePipe) {
  }
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
    let encodedSelectedProductList = [];
    this.page=1;
    //console.log('selected products=' + this.selectedProducts);
    if (this.selectedProducts && this.selectedProducts.length > 0) {
      for (let product of this.selectedProducts) {
        console.log(product);
        encodedSelectedProductList.push(encodeURIComponent(product));
      }
    }
    // console.log(encodedSelectedProductList);
    this.loader = true;
    this.dataService.getPatientDispensationSummary(this.selectedUser,this.selectedState, this.selectedDistrict, this.selectedFacility, encodedSelectedProductList, this.datePipe.transform(this.dispenseStartDate, 'yyyy-MM-dd'),this.datePipe.transform(this.dispenseEndDate, 'yyyy-MM-dd')).subscribe(data => {
      let response: any;
      response = data;
      let result: any = data;
      // reset the unique dates and unique products
      this.dispensationDates = [];
      this.dispensationProducts = [];

      // reset the filter values
      // this.stateFilterValues = [];
      // this.districtFilterValues = [];
      // this.facilityFilterValues = [];
      // product filter values is straight forward populated from the return dataset
      this.stateFilterValues = result.filters.states;
      this.districtFilterValues = result.filters.districts;
      this.facilityFilterValues = result.filters.facilities;
      this.productFilterValues = result.filters.products;

      // update the filters based on the new data received
      // iterate the list and check if the value already exists or not (avoid adding it more than once)
      for (let item of result.data) {
        // update the state filter values
        // if(!this.stateFilterValues.find(({name})=>name===item[0])) {
        //   this.stateFilterValues = [...this.stateFilterValues, { id: item[0], name: item[0] }];
        // }
        // // update the district filter values
        // if(!this.districtFilterValues.find(({name})=>name===item[1])) {
        //   this.districtFilterValues = [...this.districtFilterValues, { id: item[1], name: item[1] }];
        // }
        // // update the facility filter values
        // if(!this.facilityFilterValues.find(({name})=>name===item[2])) {
        //   this.facilityFilterValues = [...this.facilityFilterValues, { id: item[2], name: item[2] }];
        // }

        // update the unique dispensation dates
        if (!this.dispensationDates.find(value => value === item[0])) {
          this.dispensationDates = [...this.dispensationDates, item[0]];
        }
        // update the unique dispensation products
        if (!this.dispensationProducts.find(value => value === item[1])) {
          this.dispensationProducts = [...this.dispensationProducts, item[1]];
        }
      }
      // console.log(this.dispensationDates);
      // console.log(this.dispensationProducts);
      this.rawDispensationData = result.data;
      // process the resulting data, pivot the table so it will be easy to render
      // we construct a 2 dimensional array where each row is a date and for every product we add 2 columns
      this.dispensationData = [];
      for (let product of this.dispensationProducts) {
        // for every date, we have a list of products
        let dispensationDateProduct = [];
        for (let dispensationDate of this.dispensationDates) {
          // we initialize the values to 0
          let dispensation = {
            date: dispensationDate,
            patients: 0,
            quantity: 0
          }
          dispensationDateProduct[dispensationDate] = dispensation;
        }
        this.dispensationData[product] = dispensationDateProduct;
      }
      // console.log(this.dispensationData);
      // iterate on the result set and aggregate based on the product and date
      for (let raw of this.rawDispensationData) {
        let dispensationDate = raw[0];
        let dispensationProduct = raw[1];
        // locate the record
        let dispensation = this.dispensationData[dispensationProduct][dispensationDate];
        dispensation.patients += Number(raw[2]);
        dispensation.quantity += Number(raw[3]);
      }

      // console.log(this.dispensationData);
      // construct the raw table for display
      this.dispensationTable = [];
      let dispensationHeader = [];
      dispensationHeader.push("Dispensation Date");
      for (let product of this.dispensationProducts) {
        dispensationHeader.push("Patients");
        dispensationHeader.push("Quantity");
      }
      this.dispensationTable.push(dispensationHeader);

      for (let dispensationDate of this.dispensationDates) {
        let dispensationRow = [];
        dispensationRow.push(dispensationDate);
        for (let product of this.dispensationProducts) {
          // console.log('product=' + product)
          // console.log('dispensationDate=' + dispensationDate)

          let patients = this.dispensationData[product][dispensationDate].patients;
          let quantity = this.dispensationData[product][dispensationDate].quantity;
          dispensationRow.push(patients);
          dispensationRow.push(quantity);
        }
        this.dispensationTable.push(dispensationRow);
      }
      // remove the loading icon
      this.loader = false;
    }, error => {
      // in case the http request failed, remove the loading icon
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
    let facility = '';
    let district = '';
    let encodedSelectedProductList = [];

    if (this.selectedState && this.selectedState.length > 0) {
      state = this.selectedState[0];
     
    }
    if (this.selectedDistrict && this.selectedDistrict.length > 0) {
      district = this.selectedDistrict[0];
    }
    if (this.selectedFacility && this.selectedFacility.length > 0) {
      facility = this.selectedFacility[0];
    }
    if (this.selectedProducts && this.selectedProducts.length > 0) {
      for (let product of this.selectedProducts) {
        encodedSelectedProductList.push(encodeURIComponent(product));
      }
    }
    let startDate = this.datePipe.transform(this.dispenseStartDate, 'yyyy-MM-dd') ? this.datePipe.transform(this.dispenseStartDate, 'yyyy-MM-dd') : '';
    let endDate = this.datePipe.transform(this.dispenseEndDate, 'yyyy-MM-dd') ? this.datePipe.transform(this.dispenseEndDate, 'yyyy-MM-dd') : '';
    let a = document.createElement('a');
    a.href = PatientDispensationSummary.DOWNLOAD_BASE_URL + '?username='+this.selectedUser+'&state=' + state + '&district=' + district + '&facility=' + facility + '&products=' + encodedSelectedProductList + '&dispense_start_date=' + startDate + '&dispense_end_date=' + endDate + '&type=' + type;
    a.click();
  }

}
