import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import { DataService } from '../../../services/data-services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Config } from '../../../config';
@Component({
  selector: 'app-sample-report',
  templateUrl: './sample-report.component.html',
  styleUrls: ['./sample-report.component.scss']
})
export class SampleReportComponent implements OnInit {

  // drop down list values
  public userFilterValues: any = [ 'NACO' ,'SACS','N/A','artmedicalofficer','rusan','tnart47','lokesh','upsacs','fert','CGGBD001','ashishduttrv','tnart48'];
  public stateFilterValues: any = [];
  public districtFilterValues: any = [];
  public facilityFilterValues: any = [];
  public productFilterValues: any = [];
  // current value of the filters
  public selectedUser: any;
  public selectedState:any;
  public selectedDistrict:any;
  public selectedFacility:any;
  public selectedProducts:any;
  public dispenseStartDate;
  public dispenseEndDate;
  // raw dispensation data
  public rawDispensationData: any;
  public dispensationDates: any = [];
  public dispensationProducts: any = [];
  public dispensationData: any = [];
  public dispensationTable: any = [];
  public loader=false;
  static url = Config.url;
  constructor(private sanitizer: DomSanitizer,private dataService:DataService,private router:Router) { }

  ngOnInit(): void {

    this.filterChange();
  }
 
  filterChange() {
    let state = '';
    let facility = '';
    let district = '';
    let encodedSelectedProductList = [];

    if (this.selectedState && this.selectedState.length > 0) {
      state = this.selectedState[0].name;
    }
    if (this.selectedDistrict && this.selectedDistrict.length > 0) {
      district = this.selectedDistrict[0].name;
    }
    if (this.selectedFacility && this.selectedFacility.length > 0) {
      facility = this.selectedFacility[0].name;
    }
   
    //console.log('selected products=' + this.selectedProducts);
    if (this.selectedProducts && this.selectedProducts.length > 0) {
      for (let product of this.selectedProducts) {
        console.log(product);
        encodedSelectedProductList.push(encodeURIComponent(product));
      }
    }
    // console.log(encodedSelectedProductList);
    this.loader=true;
    this.dataService.getPatientDispensationSummary(this.selectedUser,state, district, facility, encodedSelectedProductList, this.dispenseStartDate, this.dispenseEndDate).subscribe(data=>{
      let response:any;
      response = data;
      let result:any = data;
      // reset the unique dates and unique products
      this.dispensationDates = [];
      this.dispensationProducts = [];

      // reset the filter values
      this.stateFilterValues = [];
      this.districtFilterValues = [];
      this.facilityFilterValues = [];
      // product filter values is straight forward populated from the return dataset
      this.productFilterValues = result.product_filter_values;

      // update the filters based on the new data received
      // iterate the list and check if the value already exists or not (avoid adding it more than once)
      for(let item of result.data) {
        // update the state filter values
        if(!this.stateFilterValues.find(({name})=>name===item[0])) {
          this.stateFilterValues = [...this.stateFilterValues, { id: item[0], name: item[0] }];
        }
        // update the district filter values
        if(!this.districtFilterValues.find(({name})=>name===item[1])) {
          this.districtFilterValues = [...this.districtFilterValues, { id: item[1], name: item[1] }];
        }
        // update the facility filter values
        if(!this.facilityFilterValues.find(({name})=>name===item[2])) {
          this.facilityFilterValues = [...this.facilityFilterValues, { id: item[2], name: item[2] }];
        }

        // update the unique dispensation dates
        if(!this.dispensationDates.find(value => value === item[6])) {
          this.dispensationDates = [...this.dispensationDates, item[6] ];
        }
        // update the unique dispensation products
        if(!this.dispensationProducts.find(value => value === item[3])) {
          this.dispensationProducts = [...this.dispensationProducts, item[3] ];
        }
      }
      this.loader=false;
      // console.log(this.dispensationDates);
      // console.log(this.dispensationProducts);
      this.rawDispensationData = result.data;
      // process the resulting data, pivot the table so it will be easy to render
      // we construct a 2 dimensional array where each row is a date and for every product we add 2 columns
      this.dispensationData = [];
      for (let product of this.dispensationProducts) {
        // for every date, we have a list of products
        let dispensationDateProduct = [];
        for(let dispensationDate of this.dispensationDates) {
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
        let dispensationDate = raw[6];
        let dispensationProduct = raw[3];
        // locate the record
        let dispensation = this.dispensationData[dispensationProduct][dispensationDate];
        dispensation.patients += Number(raw[4]);
        dispensation.quantity += Number(raw[5]);
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
    },error=>{
      this.loader=false;
    });

    
  }
  
  public downloadCSV(type){
    let state = '';
    let facility = '';
    let district = '';
    let encodedSelectedProductList = [];

    if (this.selectedState && this.selectedState.length > 0) {
      state = this.selectedState[0].name;
    }
    if (this.selectedDistrict && this.selectedDistrict.length > 0) {
      district = this.selectedDistrict[0].name;
    }
    if (this.selectedFacility && this.selectedFacility.length > 0) {
      facility = this.selectedFacility[0].name;
    }
    if (this.selectedProducts && this.selectedProducts.length > 0) {
      for (let product of this.selectedProducts) {
        encodedSelectedProductList.push(encodeURIComponent(product));
      }
    }
    let startDate=this.dispenseStartDate?this.dispenseStartDate:'';
    let endDate=this.dispenseEndDate?this.dispenseEndDate:'';
    let a = document.createElement('a');
    a.href = SampleReportComponent.url+'/v1/report/pds-export?state='+state+'&district='+district+'&facility='+facility+'&product='+encodedSelectedProductList+'&dispense_start_date='+startDate+'&dispense_end_date='+endDate+'&type='+type;

    // start download
    a.click();
    
  }
}
