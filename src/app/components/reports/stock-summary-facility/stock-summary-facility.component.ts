import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../../services/data-services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Config } from '../../../config';
import { DatePipe } from '@angular/common';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-stock-summary-facility',
  templateUrl: './stock-summary-facility.component.html',
  styleUrls: ['./stock-summary-facility.component.scss'],
  providers: [DatePipe],
})
export class StockSummaryFacilityComponent implements OnInit {


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
  public selectedProduct: any = '';
  public transactionStartDate = '';
  public transactionEndDate = '';
  // raw dispensation data
  public rawStockSummaryData: any;
  public loader = false;
  static DOWNLOAD_BASE_URL = Config.url + '/v1/report/ssf-export';
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
  }
  /**
   * get filter values from backend
   */
  getFilter(){
    this.loader = true;
    if(this.selectedState.length<=0)
    {
      this.selectedDistrict=this.selectedFacility=null;
    }
    if(this.selectedDistrict<=0)
    {
      this.selectedFacility=null;
    }
    let encodedSelectedProductList = [];
    if (this.selectedProduct && this.selectedProduct.length > 0) {
      for (let product of this.selectedProduct) {
        encodedSelectedProductList.push(encodeURIComponent(product));
      }
    }
    this.dataService.stockSummaryFilter(this.selectedUser,this.selectedState, this.selectedDistrict, this.selectedFacility, encodedSelectedProductList, this.transactionStartDate, this.transactionEndDate).subscribe(data=>{
      let result: any;
      this.loader = false;
      result = data;
      this.stateFilterValues = result.filters.state;
      this.districtFilterValues = result.filters.district;
      this.facilityFilterValues = result.filters.facility;
      this.productFilterValues = result.filters.product;
    }, error => {
      this.loader = false;
    });
  }
  /**
   * When filter values changed, update the display
   */
  filterChange() {
    if(!(this.transactionStartDate && this.transactionEndDate && this.selectedFacility))
    return;
    let encodedSelectedProductList = [];
    if (this.selectedProduct && this.selectedProduct.length > 0) {
      for (let product of this.selectedProduct) {
        encodedSelectedProductList.push(encodeURIComponent(product));
      }
    }
    this.loader = true;
    this.rawStockSummaryData=[];
    this.page=1;
    this.dataService.getStockSummary(this.selectedUser,this.selectedState, this.selectedDistrict, this.selectedFacility, encodedSelectedProductList, this.datePipe.transform(this.transactionStartDate, 'yyyy-MM-dd'), this.datePipe.transform(this.transactionEndDate, 'yyyy-MM-dd')).subscribe(data => {
      let response: any;
      this.loader = false;
      response = data;
      let result: any = data;
     
      this.rawStockSummaryData = result.data;
    }, error => {
      this.loader = false;
    });
   
  }

  public download(type) {
    let state = '';
    let facility = '';
    let district = '';
    let facilityType = '';
    let selectedProduct = '';
    let encodedSelectedProductList = [];
    if (this.selectedState && this.selectedState.length > 0) {
      state = this.selectedState;
    }
    if (this.selectedDistrict && this.selectedDistrict.length > 0) {
      district = this.selectedDistrict;
    }
    if (this.selectedFacility && this.selectedFacility.length > 0) {
      facility = this.selectedFacility;
    }
    if (this.selectedProduct && this.selectedProduct.length > 0) {
      for (let product of this.selectedProduct) {
        encodedSelectedProductList.push(encodeURIComponent(product));
      }
    }
    let startDate = this.transactionStartDate ? this.datePipe.transform(this.transactionStartDate, 'yyyy-MM-dd') : '';
    let endDate = this.transactionEndDate ? this.datePipe.transform(this.transactionEndDate, 'yyyy-MM-dd') : '';
    let a = document.createElement('a');
    a.href = StockSummaryFacilityComponent.DOWNLOAD_BASE_URL + '?username='+this.selectedUser+'&state=' + state + '&district=' + district + '&facility=' + facility + '&facility_type=' + facilityType + '&product=' + encodedSelectedProductList + '&transaction_start_date=' + startDate + '&transaction_end_date=' + endDate + '&type=' + type;
    a.click();
  }
}