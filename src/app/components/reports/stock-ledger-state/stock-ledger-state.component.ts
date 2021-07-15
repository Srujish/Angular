import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../../services/data-services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Config } from '../../../config';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-stock-ledger-state',
  templateUrl: './stock-ledger-state.component.html',
  styleUrls: ['./stock-ledger-state.component.scss'],
  providers: [DatePipe]
})
export class StockLedgerStateComponent implements OnInit {
 // drop down list values
 public sacsFilterValues: any = [];
 public programDivisionFilterValues: any = [];
 public productFilterValues: any = [];

 // current value of the filters
 public selectedUser: any = '';
 public selectedSACS: any = '';
 public selectedDivision: any = '';
 public selectedProducts: any = '';
 public registrationStartDate = '';
 public registrationEndDate = '';
 // raw dispensation data
 public rawSummaryData: any;
 public loader = false;
 static DOWNLOAD_BASE_URL = Config.url + '/v1/report/stockledger-export';
public products=[];
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
   this.getfilters();
 }
  /**
  * When filter values changed, update the display
  */
 getfilters(){
  // this.loader = true;
  this.rawSummaryData=[];
  this.products=[];
  let encodedSelectedProductList = [];
  if (this.selectedProducts && this.selectedProducts.length > 0) {
    for (let product of this.selectedProducts) {
      console.log(product);
      encodedSelectedProductList.push(encodeURIComponent(product));
    }
  }
  this.dataService.getStockLedgerStateFilters(this.selectedUser,this.selectedSACS,encodedSelectedProductList,this.datePipe.transform(this.registrationStartDate, 'yyyy-MM-dd'), this.datePipe.transform(this.registrationEndDate, 'yyyy-MM-dd')).subscribe(data => {
    let response: any;
    response = data;
    // this.loader = false;
    let result: any = data;
    this.sacsFilterValues = result.filters.sacs;
    this.productFilterValues = result.filters.products;
  }, error => {
    this.loader = false;
  });
 }
 /**
  * When filter values changed, update the display
  */
 filterChange() {
  if(!this.registrationStartDate || !this.registrationEndDate || this.selectedSACS.length<=0)
  return;
   this.loader = true;
   this.rawSummaryData=[];
   this.products=[];
   let encodedSelectedProductList = [];
   if (this.selectedProducts && this.selectedProducts.length > 0) {
     for (let product of this.selectedProducts) {
       
       encodedSelectedProductList.push(encodeURIComponent(product));
     }
   }
   this.dataService.getStockLedgerState(this.selectedUser,this.selectedSACS,encodedSelectedProductList,this.datePipe.transform(this.registrationStartDate, 'yyyy-MM-dd'), this.datePipe.transform(this.registrationEndDate, 'yyyy-MM-dd')).subscribe(data => {
     let response: any;
     response = data;
     this.loader = false;
     let result: any = data;
 
     this.rawSummaryData = result.data;
     if(this.selectedSACS && this.registrationStartDate && this.registrationEndDate){
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
   let sacs = '';
   let encodedSelectedProductList = [];
   //console.log('selected products=' + this.selectedProducts);
   if (this.selectedProducts && this.selectedProducts.length > 0) {
     for (let product of this.selectedProducts) {
       encodedSelectedProductList.push(encodeURIComponent(product));
     }
   }
   let startDate = this.registrationStartDate ? this.datePipe.transform(this.registrationStartDate, 'yyyy-MM-dd') : '';
   let endDate = this.registrationEndDate ? this.datePipe.transform(this.registrationEndDate, 'yyyy-MM-dd') : '';
   let a = document.createElement('a');
   a.href = StockLedgerStateComponent.DOWNLOAD_BASE_URL + '?username='+this.selectedUser+'&facility=' + this.selectedSACS + '&products=' + encodedSelectedProductList + '&from_date=' + startDate + '&to_date=' + endDate + '&type=' + type;
   a.click();
 }
}