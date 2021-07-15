import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../../services/data-services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Config } from '../../../config';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-stock-ledger-facility',
  templateUrl: './stock-ledger-facility.component.html',
  styleUrls: ['./stock-ledger-facility.component.scss'],
  providers: [DatePipe],
})
export class StockLedgerFacilityComponent implements OnInit {
 // drop down list values
 public stateFilterValues: any = [];
 public districtFilterValues: any = [];
 public facilityFilterValues: any = [];
 public productFilterValues: any = [];
 public facilityTypeFilterValues: any = [];

 // current value of the filters
 public selectedUser: any = '';
 public selectedState: any = '';
 public selectedDistrict: any = '';
 public selectedFacility: any = '';
 public selectedFacilityType: any = '';
 public selectedProducts: any = '';
 public registrationStartDate = '';
 public registrationEndDate = '';
 // raw dispensation data
 public rawSummaryData: any;
 public loader = false;
 static DOWNLOAD_BASE_URL = Config.url + '/v1/report/stockledger-export';
public products=[];
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
   this.getFilters();
 }
 getFilters(){
      this.dataService.stockLedgerFacilityFilter(this.selectedUser, this.selectedState, this.selectedDistrict, this.selectedFacility, this.selectedFacilityType, encodeURIComponent(this.selectedProducts), this.datePipe.transform(this.registrationStartDate, 'yyyy-MM-dd'), this.datePipe.transform(this.registrationEndDate, 'yyyy-MM-dd')).subscribe(data => {
     this.loader = false;
     let response: any;
     response = data;
     this.loader = false;
     let result: any = data;
     this.stateFilterValues = result.filters.states;
     this.districtFilterValues = result.filters.districts;
     this.facilityFilterValues = result.filters.facilities;
     this.productFilterValues = result.filters.products;
     this.facilityTypeFilterValues = result.filters.facilityType;
      }, error => {
        this.loader = false;
      });
 }
 /**
  * When filter values changed, update the display
  */
 filterChange() {
  if(!this.registrationStartDate || !this.registrationEndDate || this.selectedFacility.length <= 0)
  return
   this.loader = true;
   this.rawSummaryData=[];
   this.products=[];
   this.dataService.stockLedgerFacility(this.selectedUser, this.selectedState, this.selectedDistrict, this.selectedFacility, this.selectedFacilityType, encodeURIComponent(this.selectedProducts), this.datePipe.transform(this.registrationStartDate, 'yyyy-MM-dd'), this.datePipe.transform(this.registrationEndDate, 'yyyy-MM-dd')).subscribe(data => {
     this.loader = false;
     let response: any;
     response = data;
     let result: any = data;
     this.rawSummaryData = result.data;
      for(let row of this.rawSummaryData){
        let item=this.products.find(product => product.productCode === row[4]);
 
       if (!item) {
         let qty=Number(row[10]);
         let balance=Number(row[11]);
         row[11]=qty+balance;
         let product={
           'productName':row[3],
           'productCode':row[4],
           'productDetails':[row],
           'openingBalance':balance,
           'closingQty':qty+balance,
           'page':1
         }
       this.products = [...this.products, product];
       }else{
         let qty=Number(row[10]);
         let balance=Number(row[11]);
         row[11]=item.closingQty+qty;
         item.closingQty=item.closingQty+qty;
         item.productDetails.push(row)
       }
      }
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
   let state=this.selectedState?this.selectedState:'';
   let district=this.selectedDistrict?this.selectedDistrict:'';
   let facility=this.selectedFacility?this.selectedFacility:'';
   let facilityType=this.selectedFacilityType?this.selectedFacilityType:'';
   let startDate = this.registrationStartDate ? this.datePipe.transform(this.registrationStartDate, 'yyyy-MM-dd') : '';
   let endDate = this.registrationEndDate ? this.datePipe.transform(this.registrationEndDate, 'yyyy-MM-dd') : '';
   //console.log('selected products=' + this.selectedProducts);
   if (this.selectedProducts && this.selectedProducts.length > 0) {
     for (let product of this.selectedProducts) {
       encodedSelectedProductList.push(encodeURIComponent(product));
     }
   }

   let a = document.createElement('a');
   a.href = StockLedgerFacilityComponent.DOWNLOAD_BASE_URL + '?username=' + this.selectedUser  + '&type=' + type+ '&state=' + state + '&district=' + district + '&facility=' + facility + '&facility_type=' + facilityType + '&products=' + encodedSelectedProductList + '&from_date=' + startDate + '&to_date=' + endDate;
   a.click();
 }
}

