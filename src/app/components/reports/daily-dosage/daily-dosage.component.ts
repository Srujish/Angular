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
  selector: 'app-daily-dosage',
  templateUrl: './daily-dosage.component.html',
  styleUrls: ['./daily-dosage.component.scss']
})
export class DailyDosageComponent implements OnInit {


  // drop down list values
  public OSTFilterValues: any = [];
  public districtFilterValues: any = [];
  public monthFilterValues: any = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  public yearFilterValues: any = [];
  public dispatchedTypeFilterValues: any = [];
  public dispatchedyearFilterValues: any = [];
  // current value of the filters
  public selectedOST: any = '';
  public selectedDistrict: any = '';
  public selectedMonth: any = '';
  public selectedYear: any = '';
  public selectedDispatchedMonth: any = '';
  public selectedDispatchedYear: any = '';
  public pageNumber = 1;
  // raw dispensation data
  public rawStockSummaryData: any;
  public rawDispensionData: any;
  public loader = false;
  public dataLoader = false;
  static DOWNLOAD_BASE_URL = Config.url + '/v1/report/dds-export';
  static DISPENSION_BASE_URL = Config.url + '/v1/report/dds-dispensation-export';
  public days: any;
  public page = 1;
  public itemCount = 0;
  public dispensionItemCount;
  public dispensionData = [];
  public pageCount = 1;
  /**
   * Constructor 
   * @param sanitizer
   * @param dataService 
   * @param router 
   */
  constructor(private sanitizer: DomSanitizer, private dataService: DataService, private router: Router) {
    this.days = Array(31).fill(0).map((x, i) => i);
  }

  /**
   * Initialization
   */
  ngOnInit(): void {
    this.getFilter();
    this.getYearFilterValues();
  }
  /**
   * get filter values from backend
   */
  /**
* create values for year filter
*/
  getYearFilterValues() {
    let currentYear = new Date().getFullYear();
    for (let year = 2015; year <= currentYear; year++) {
      this.yearFilterValues.push(year);
    }
  }
  getFilter() {
    this.loader = true;
    this.dataService.dailyDosageFilter().subscribe(data => {
      let result: any;
      this.loader = false;
      result = data;
      this.OSTFilterValues = result.filters.CenterName;
      this.districtFilterValues = result.filters.CenterDistrict;
    }, error => {
      this.loader = false;
    });
  }
  /**
   * When filter values changed, update the display
   */
  filterChange() {
    if (!this.selectedMonth || !this.selectedYear)
      return;
    this.loader = true;
    this.rawStockSummaryData = [];
    this.dataService.dailyDosage(this.pageNumber, encodeURIComponent(this.selectedOST), this.selectedDistrict, this.selectedMonth, this.selectedYear).subscribe(data => {
      let response: any;
      this.loader = false;
      response = data;
      let result: any = data;

      this.rawStockSummaryData = result.data;
    }, error => {
      this.loader = false;
    });
  }
  /**
   * When filter values changed, update dispensation data
   */
  filterChangeDispensation() {
    if (!this.selectedDispatchedMonth || !this.selectedDispatchedYear)
      return;
    this.loader = true;
    this.pageNumber = 1;
    this.rawDispensionData = [];
    this.dataService.dailyDosageDispension(this.pageNumber, encodeURIComponent(this.selectedOST), this.selectedDistrict, this.selectedDispatchedMonth, this.selectedDispatchedYear).subscribe(data => {
      let response: any;
      this.loader = false;
      response = data;
      let result: any = data;
      this.rawDispensionData = result.newdata;
      this.getDispensionData();
      this.dispensionItemCount = result.count[0][0];
    }, error => {
      this.loader = false;
    });
  }
  getDispensionData() {
    this.dispensionData = [];
    for (let row of this.rawDispensionData) {
      let i = 0;
      let item1: any;
      let item2: any;
      for (let item of row) {
        let disp = [];
        disp[0] = { item: item[9], color: false };
        disp[1] = { item: item[10], color: false };
        disp[2] = { item: Number(item[15]) + Number(item[57]), color: item[57] > 0 ? true : false };
        disp[3] = { item: Number(item[16]) + Number(item[58]), color: item[58] > 0 ? true : false };
        disp[4] = { item: Number(item[17]) + Number(item[59]), color: item[59] > 0 ? true : false };
        disp[5] = { item: Number(item[18]) + Number(item[60]), color: item[60] > 0 ? true : false };
        disp[6] = { item: Number(item[19]) + Number(item[61]), color: item[61] > 0 ? true : false };
        disp[7] = { item: Number(item[20]) + Number(item[62]), color: item[62] > 0 ? true : false };
        disp[8] = { item: Number(item[21]) + Number(item[63]), color: item[63] > 0 ? true : false };
        disp[9] = { item: Number(item[22]) + Number(item[64]), color: item[64] > 0 ? true : false };
        disp[10] = { item: Number(item[23]) + Number(item[65]), color: item[65] > 0 ? true : false };
        disp[11] = { item: Number(item[24]) + Number(item[66]), color: item[66] > 0 ? true : false };
        disp[12] = { item: Number(item[25]) + Number(item[67]), color: item[67] > 0 ? true : false };
        disp[13] = { item: Number(item[26]) + Number(item[68]), color: item[68] > 0 ? true : false };
        disp[14] = { item: Number(item[27]) + Number(item[69]), color: item[69] > 0 ? true : false };
        disp[15] = { item: Number(item[28]) + Number(item[70]), color: item[70] > 0 ? true : false };
        disp[16] = { item: Number(item[29]) + Number(item[71]), color: item[71] > 0 ? true : false };
        disp[17] = { item: Number(item[30]) + Number(item[72]), color: item[72] > 0 ? true : false };
        disp[18] = { item: Number(item[31]) + Number(item[73]), color: item[73] > 0 ? true : false };
        disp[19] = { item: Number(item[32]) + Number(item[74]), color: item[74] > 0 ? true : false };
        disp[20] = { item: Number(item[33]) + Number(item[75]), color: item[75] > 0 ? true : false };
        disp[21] = { item: Number(item[34]) + Number(item[76]), color: item[76] > 0 ? true : false };
        disp[22] = { item: Number(item[35]) + Number(item[77]), color: item[77] > 0 ? true : false };
        disp[23] = { item: Number(item[36]) + Number(item[78]), color: item[78] > 0 ? true : false };
        disp[24] = { item: Number(item[37]) + Number(item[79]), color: item[79] > 0 ? true : false };
        disp[25] = { item: Number(item[38]) + Number(item[80]), color: item[80] > 0 ? true : false };
        disp[26] = { item: Number(item[39]) + Number(item[81]), color: item[81] > 0 ? true : false };
        disp[27] = { item: Number(item[40]) + Number(item[82]), color: item[82] > 0 ? true : false };
        disp[28] = { item: Number(item[41]) + Number(item[83]), color: item[83] > 0 ? true : false };
        disp[29] = { item: Number(item[42]) + Number(item[84]), color: item[84] > 0 ? true : false };
        disp[30] = { item: Number(item[43]) + Number(item[85]), color: item[85] > 0 ? true : false };
        disp[31] = { item: Number(item[44]) + Number(item[86]), color: item[86] > 0 ? true : false };
        disp[32] = { item: Number(item[45]) + Number(item[87]), color: item[87] > 0 ? true : false };
        disp[33] = { item: Number(item[46]) + Number(item[88]), color: item[88] > 0 ? true : false };
        disp[34] = { item: Number(item[89]) + Number(item[47]), color: false };

        disp[35] = { item: Number(item[90].split(' ', 2)[0]) + Number(item[48].split(' ', 2)[0]), color: false };
        if(disp[35].item>0)
          disp[35].item=disp[35].item+''+ item[15]
        if (i == 0)
          item1 = disp;
        if (i == 1)
          item2 = disp;
        // if (disp[35].item != "0ML" && disp[35].item != "0MG")
        //   this.dispensionData.push(disp);
        i++;
      }
      if(!item2){
        if(item1[35].item!= "0")
        this.dispensionData.splice(0, 0, item1)
      else
        this.dispensionData.push(item1);
      }
      else if (item2[35].item == "0"){
        if(item1[35].item!= "0")
          this.dispensionData.splice(0, 0, item1)
        else
          this.dispensionData.push(item1);
      }
      else {
        if (item1[35].item != "0" && item1[35].item != "0")
          this.dispensionData.splice(0, 0, item1)
        if (item2[35].item != "0" && item2[35].item != "0")
          this.dispensionData.splice(0, 0, item2)
      }

    }
  }
  loadMore() {
    this.dataLoader = true;
    this.pageNumber++;
    this.loader = true;
    this.dataService.dailyDosageDispension(this.pageNumber, this.selectedOST, this.selectedDistrict, this.selectedDispatchedMonth, this.selectedDispatchedYear).subscribe(data => {
      let response: any;

      response = data;
      let result: any = data;
      this.rawDispensionData = this.rawDispensionData.concat(result.data);
      this.dataLoader = false;
      this.loader = false;
    }, error => {
      this.loader = false;
      this.dataLoader = false;
    });
  }
  public download(type) {
    let a = document.createElement('a');
    a.href = DailyDosageComponent.DOWNLOAD_BASE_URL + '?center_name=' + encodeURIComponent(this.selectedOST) + '&district_name=' + this.selectedDistrict + '&Year=' + this.selectedYear + '&Month=' + this.selectedMonth + '&type=' + type;
    a.click();
  }
  public downloadDispension(type) {
    let a = document.createElement('a');
    a.href = DailyDosageComponent.DISPENSION_BASE_URL + '?center_name=' + encodeURIComponent(this.selectedOST) + '&district_name=' + this.selectedDistrict + '&Year=' + this.selectedDispatchedYear + '&Month=' + this.selectedDispatchedMonth + '&type=' + type;
    a.click();
  }

  pageChange(event) {
    this.pageNumber = event;
    this.page = event;
    this.loader = true;
    this.dataService.dailyDosageDispension(this.pageNumber, encodeURIComponent(this.selectedOST), this.selectedDistrict, this.selectedDispatchedMonth, this.selectedDispatchedYear).subscribe(data => {
      let response: any;
      this.loader = false;
      response = data;
      let result: any = data;
      this.rawDispensionData = result.newdata;
      this.getDispensionData();
      this.dispensionItemCount = result.count[0][0];
    }, error => {
      this.loader = false;
    });
  }
}