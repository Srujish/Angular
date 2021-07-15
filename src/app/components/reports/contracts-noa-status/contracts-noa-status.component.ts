import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../../services/data-services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Config } from '../../../config';
@Component({
  selector: 'contracts-noa-status',
  templateUrl: './contracts-noa-status.component.html',
  styleUrls: ['./contracts-noa-status.component.scss'],
})
export class ContractsNOAStatusComponent implements OnInit {
  public loader = false;
  // drop down list values
  public supplierFilterValues: any = [];
  public indentNumberFilterValues: any = [];
  public noaFilterValues: any = [];
  public productFilterValues: any = [];
  public scheduleFilterValues: any = [];
  // current value of the filters
  public selectedUser: any = '';
  public selectedSupplier: any = '';
  public selectedIndentNumber: any = '';
  public selectedNOA: any = '';
  public selectedProduct: any = '';
  public selectedSchedule: any = '';
  public contractsNOAData: any = [];
  public pageNumber = 1;
  public dataLoader = false;
  static DOWNLOAD_BASE_URL = Config.url + '/v1/report/cnoas-export'
  public itemCount = 0;
  /**
   * Constructor
   * 
   * @param sanitizer 
   * @param dataService 
   */
  constructor(private sanitizer: DomSanitizer, private dataService: DataService) {
  }
  /**
   * Initialization
   */
  ngOnInit(): void {
    this.filterChange();
  }
  /**
   * Filter data change, then update the display
   */
  filterChange() {
    this.pageNumber=1;
    this.loader = true;
    this.dataService.getContractsNOAStatus(this.selectedUser, this.pageNumber, this.selectedSupplier, this.selectedIndentNumber, this.selectedNOA, encodeURIComponent(this.selectedProduct), this.selectedSchedule).subscribe(response => {
      let responseData: any;
      responseData = response;
      // Update the filter values
      this.supplierFilterValues = responseData.filters.suppliers;
      this.indentNumberFilterValues = responseData.filters.indentNumbers;
      this.noaFilterValues = responseData.filters.noas;
      this.productFilterValues = responseData.filters.products;
      this.scheduleFilterValues = responseData.filters.schedules;
      this.itemCount = responseData.count[0][0];
      this.contractsNOAData = responseData.data;
      this.loader = false;
    }, error => {
      this.loader = false;
    });
  }
  /**
* Download content
* 
* @param type type of download either csv, xls, xlsx
*/
  public download(type) {
    let supplier = '';
    let indentNumber = '';
    let noa = '';
    let encodedProduct = [];
    let schedule = '';
    let noaData = '';
    if (this.selectedSupplier && this.selectedSupplier.length > 0) {
      supplier = this.selectedSupplier[0];
    }
    if (this.selectedIndentNumber && this.selectedIndentNumber.length > 0) {
      indentNumber = this.selectedIndentNumber[0];
    }
    if (this.selectedNOA && this.selectedNOA.length > 0) {
      noa = this.selectedNOA[0];
    }
    if (this.selectedProduct && this.selectedProduct.length > 0) {
      for (let product of this.selectedProduct) {
        encodedProduct.push(encodeURIComponent(product));
      }
    }

    if (this.selectedSchedule && this.selectedSchedule.length > 0) {
      schedule = this.selectedSchedule[0];
    }
    if (this.contractsNOAData && this.contractsNOAData.length > 0) {
      noaData = this.contractsNOAData[0];
    }
    let a = document.createElement('a');
    a.href = ContractsNOAStatusComponent.DOWNLOAD_BASE_URL + '?username=' + this.selectedUser + '&supplier=' + supplier + '&indent_number=' + indentNumber + '&noa=' + noa + '&product=' + encodedProduct + '&schedule=' + schedule + '&type=' + type;
    a.click();
  }
  /**
 * click on load more button, then update the display
 */
  loadMore() {
    this.loader = true;
    this.pageNumber += 1;
    this.dataLoader = true;
    this.dataService.getContractsNOAStatus(this.selectedUser, this.pageNumber, this.selectedSupplier, this.selectedIndentNumber, this.selectedNOA, this.selectedProduct, this.selectedSchedule).subscribe(response => {
      let responseData: any;
      responseData = response;
      this.contractsNOAData = this.contractsNOAData.concat(responseData.data);
      this.itemCount = responseData.count[0][0];
      this.loader = false;
      this.dataLoader = false;
    }, error => {
      this.loader = false;
    });
  }
  pageChange(event) {
    this.pageNumber = event;
    this.loader = true;
    this.dataService.getContractsNOAStatus(this.selectedUser, this.pageNumber, this.selectedSupplier, this.selectedIndentNumber, this.selectedNOA, encodeURIComponent(this.selectedProduct), this.selectedSchedule).subscribe(response => {
      let responseData: any;
      responseData = response;
      // Update the filter values
      this.supplierFilterValues = responseData.filters.suppliers;
      this.indentNumberFilterValues = responseData.filters.indentNumbers;
      this.noaFilterValues = responseData.filters.noas;
      this.productFilterValues = responseData.filters.products;
      this.scheduleFilterValues = responseData.filters.schedules;
      this.itemCount = responseData.count[0][0];
      this.contractsNOAData = responseData.data;
      this.loader = false;
    }, error => {
      this.loader = false;
    });
  }
}
