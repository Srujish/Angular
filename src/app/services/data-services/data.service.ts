import { HttpClient, HttpParams, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../../config';
import { strict } from 'assert';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  static url = Config.url;

  /**
   * Constructor
   */
  constructor(private http: HttpClient) {
  }
  public getFilters() {
    let request = {
      sql: "SELECT"
        + " s.name AS state,"
        + " d.name AS district,"
        + " f.name AS facility,"
        + " p.product_name AS product_name,"
        + " SUM(patients) AS patients,"
        + " SUM(quantity) AS quantity,"
        + " pds.dispense_date AS dispense_date"
        + " FROM patient_dispensation_summary_view pds"
        + " INNER JOIN state s ON (pds.state_id = s.id)"
        + " INNER JOIN district d ON (pds.district_id = d.id)"
        + " INNER JOIN facility f ON (pds.facility_id = f.id)"
        + " INNER JOIN product p ON (pds.product_id = p.id)"
        + " WHERE pds.facility_id IN (102)"
        + " GROUP BY s.name, d.name, f.name, p.product_name, pds.dispense_date",
      offset: 0,
      limit: 500000,
      acceptPartial: true,
      project: "CHAI_ICTC",
    }
    return this.http.post(DataService.url, request);
    // return this.http.get(DataService.URL+'/statepatient');
  }
  /**
   * Get Patient Dispensation Data
   * 
   * @param state state filter
   * @param district district filter
   * @param facility facility filter
   * @param products a list of product filters
   * @param dispenseStartDate dispense start date filter
   * @param dispenseEndDate dispense end date filter
   */
  public getPatientDispensationSummary(username, state, district, facility, products, dispenseStartDate, dispenseEndDate) {
    let params = new HttpParams()
      // .set('username', username ? username : '')
      .set('state', state ? state : '')
      .set('district', district ? district : '')
      .set('facility', facility ? encodeURIComponent(facility) : '')
      .set('products', products ? products : '')
      .set('dispense_start_date', dispenseStartDate ? dispenseStartDate : '')
      .set('dispense_end_date', dispenseEndDate ? dispenseEndDate : '');
    return this.http.get(DataService.url + '/v1/report/pds', { params });
  }

  /**
   * Get Contract NOA Status
   * 
   * @param state state filter
   * @param district district filter
   * @param facility facility filter
   * @param products a list of product filters
   * @param dispenseStartDate dispense start date filter
   * @param dispenseEndDate dispense end date filter
   */
  public getContractsNOAStatus(username, page, supplier, indentNumber, noa, product, schedule) {
    let params = new HttpParams()
      // .set('username', username ? username : 'nacoadmin')
      .set('page', page ? page : 1)
      .set('supplier', supplier ? supplier : '')
      .set('indent_number', indentNumber ? indentNumber : '')
      .set('noa', noa ? noa : '')
      .set('product', product ? product : '')
      .set('schedule', schedule ? schedule : '');
    return this.http.get(DataService.url + '/v1/report/cnoas', { params });
  }
  /**
   * Get ICTC Usage data
   * 
   * @param state state filter
   * @param district district filter
   * @param registrationStartDate registration start date filter
   * @param registrationEndDate registration end date filter
   */
  public getICTCUsage(username, state, district, registrationStartDate, registrationEndDate) {
    let params = new HttpParams()
      // .set('username', username ? username : 'nacoadmin')
      .set('state', state ? state : '')
      .set('district', district ? district : '')
      .set('registration_start_date', registrationStartDate ? registrationStartDate : '')
      .set('registration_end_date', registrationEndDate ? registrationEndDate : '');
    return this.http.get(DataService.url + '/v1/report/ictcu', { params });
  }
  /**
   * Get Regimen Summary - State data
   * 
   * @param facility facility filter
   * @param sacs sacs filter
   * @param regimen regimen filter
   * @param category category filter
   * @param status status filter
   * @param registrationStartDate registration start date filter
   * @param registrationEndDate registration end date filter
   */
  public getRegimenSummaryState(page, sacs, facility, regimen, category, status, registrationStartDate, registrationEndDate) {
    let params = new HttpParams()
      // .set('page', page ? page : 1)
      // .set('username', 'dsacs')
      .set('facility', facility ? encodeURIComponent(facility) : '')
      .set('sacs', sacs ? sacs : '')
      .set('regimen', regimen ? regimen : '')
      .set('category', category ? category : '')
      .set('status', status ? status : '')
      .set('registration_start_date', registrationStartDate ? registrationStartDate : '')
      .set('registration_end_date', registrationEndDate ? registrationEndDate : '')
    return this.http.get(DataService.url + '/v1/report/rss', { params });
  }
  /**
   * Get Regimen Summary - Facility data
   * 
   * @param state state filter
   * @param district district filter
   * @param facility facility end date filter
   * @param regimen regimen end date filter
   * @param category category filter
   * @param registrationStartDate registration start date filter
   * @param registrationEndDate registration end date filter
   */
  public getRegimenSummaryFacility(username, state, district, facility, regimen, category, registrationStartDate, registrationEndDate) {
    let params = new HttpParams()
      // .set('username', username ? username : '')
      // .set('page', page ? page : 1)
      .set('state', state ? state : '')
      .set('district', district ? district : '')
      .set('facility', facility ? encodeURIComponent(facility) : '')
      .set('regimen', regimen ? regimen : '')
      .set('category', category ? category : '')
      .set('registration_start_date', registrationStartDate ? registrationStartDate : '')
      .set('registration_end_date', registrationEndDate ? registrationEndDate : '');
    return this.http.get(DataService.url + '/v1/report/rsf', { params });
  }
   /**
   * Get Stock Summary filters
   */
  public stockSummaryFilter(username, state, district, facility, product, transactionStartDate, transactionEndDate) {
    let params = new HttpParams()
      // .set('username', 'nacoadmin')
      .set('state', state ? state : '')
      .set('district', district ? district : '')
      .set('facility', facility ? encodeURIComponent(facility) : '')
      .set('product', product ? product : '')
      .set('transaction_start_date', transactionStartDate ? transactionStartDate : '')
      .set('transaction_end_date', transactionEndDate ? transactionEndDate : '');
    return this.http.get(DataService.url + '/v1/report/ssf-filter', { params });
  }
  /**
   * Get Stock Summary - Facility data
   * 
   * @param state state filter
   * @param district district filter
   * @param facility facility filter
   * @param facilityType facility type filter
   * @param product product filter
   * @param transactionStartDate transaction start date filter
   * @param transactionEndDate transaction end date filter
   */
  public getStockSummary(username, state, district, facility, product, transactionStartDate, transactionEndDate) {
    let params = new HttpParams()
      // .set('username', 'nacoadmin')
      // .set('page', page ? page : 1)
      .set('state', state ? state : '')
      .set('district', district ? district : '')
      .set('facility', facility ? encodeURIComponent(facility) : '')
      .set('product', product ? product : '')
      .set('transaction_start_date', transactionStartDate ? transactionStartDate : '')
      .set('transaction_end_date', transactionEndDate ? transactionEndDate : '');
    return this.http.get(DataService.url + '/v1/report/ssf', { params });
  }
  /**
 * Get Stock Ledger - Facility data
 * 
 * @param sacs sacs filter
 * @param division Program Division filter
 * @param product product filter
 * @param registrationStartDate registration start date filter
 * @param registrationEndDate registration end date filter
 */
  public stockLedgerFacility(username,state,district,facility,facility_type,products,registrationStartDate,registrationEndDate){
    let params = new HttpParams()
    // .set('username', username ? username : '')
    // .set('page', page ? page : 1)
    .set('state', state ? state : '')
    .set('district', district ? district : '')
    .set('facility', facility ? encodeURIComponent(facility) : '')
    .set('facility_type', facility_type ? facility_type : '')
    .set('products', products ? products : '')
    .set('from_date', registrationStartDate ? registrationStartDate : '')
    .set('to_date', registrationEndDate ? registrationEndDate : '');
  return this.http.get(DataService.url + '/v1/report/stockledger-facility', { params });
  }
  public stockLedgerFacilityFilter(username,state,district,facility,facility_type,products,registrationStartDate,registrationEndDate){
    let params = new HttpParams()
    // .set('username', username ? username : '')
    // .set('page', page ? page : 1)
    .set('state', state ? state : '')
    .set('district', district ? district : '')
    .set('facility', facility ? encodeURIComponent(facility) : '')
    .set('facility_type', facility_type ? facility_type : '')
    .set('products', products ? products : '')
    .set('from_date', registrationStartDate ? registrationStartDate : '')
    .set('to_date', registrationEndDate ? registrationEndDate : '');
  return this.http.get(DataService.url + '/v1/report/stockledger-facility-filter', { params });
  }
  public getStockLedgerState(username,sacs,products,registrationStartDate,registrationEndDate){
    let params = new HttpParams()
    // .set('username', username ? 'nacoadmin' : 'nacoadmin')
    // .set('page', page ? page : 1)
    .set('sacs', sacs ? sacs : '')
    .set('products', products ? products : '')
    .set('from_date', registrationStartDate ? registrationStartDate : '')
    .set('to_date', registrationEndDate ? registrationEndDate : '');
  return this.http.get(DataService.url + '/v1/report/stockledger', { params });
  }
    public getStockLedgerStateFilters(username,sacs,products,registrationStartDate,registrationEndDate){
    let params = new HttpParams()
    // .set('username', username ? 'nacoadmin' : 'nacoadmin')
    // .set('page', page ? page : 1)
    .set('sacs', sacs ? sacs : '')
    .set('products', products ? products : '')
    .set('from_date', registrationStartDate ? registrationStartDate : '')
    .set('to_date', registrationEndDate ? registrationEndDate : '');
  return this.http.get(DataService.url + '/v1/report/stockledger-filter', { params });
  }
  /**
 * Get list of  Laboratories - Facility data
 */
  public getLaboratoryList() {
    return this.http.get(DataService.url + '/v1/report/ViralLoadft');
  }  
  /**
 * Get Stock Ledger - Facility data
 * 
 * @param laboratory laboratory filter
 * @param Year Year filter
 * @param Month Month filter
 */
public getviralLoadLabDetails(username,laboratory,year,month) {
    let params = new HttpParams()
    // .set('username', 'nacoadmin')
    .set('labname', laboratory ? laboratory : '')
    .set('year', year ? year : '')
    .set('month', month ? month : '');
    return this.http.get(DataService.url + '/v1/report/ViralLoad',{params});
}
  /**
 * Get State level perfomance report
 * 
 * @param district district filter
 * @param facility facility filter
 * @param Year Year filter
 * @param Month Month filter
 */
public stateLevelReport(username,district,facility,year,month) {
    let params = new HttpParams()
    .set('district', district ? district : '')
    .set('facility', facility ? encodeURIComponent(facility) : '')
    .set('year', year ? year : '')
    .set('month', month ? month : '');
    return this.http.get(DataService.url + '/v1/report/saco-ost-filter',{params});
}
  /**
 * Get NACO level perfomance report
 * 
 * @param district district filter
 * @param facility facility filter
 * @param Year Year filter
 * @param Month Month filter
 */
public nacoLevelReport(username,state,district,facility,year,month) {
  let params = new HttpParams()
  // .set('username', username ? username : '')
  .set('state', state ? state : '')
  .set('district', district ? district : '')
  .set('facility', facility ? encodeURIComponent(facility) : '')
  .set('year', year ? year: '')
  .set('month', month ? month : '');
  return this.http.get(DataService.url + '/v1/report/NACO-OST-Filter',{params});
}
  /**
 * Get expected Patients Visit
 * 
 * @param facility facility filter
 * @param visit_start_date visit_start_date filter
 * @param visit_end_date visit_end_date filter
 */
public expectedPatients(username,type,role,startDate,endDate){
  let params = new HttpParams()
  // .set('username', 'nacoadmin')
  .set('facility', role ? role : '')
  .set('visit_start_date', startDate ? startDate : '')
  .set('visit_end_date', endDate ? endDate : '');
  if(type==1){
      let params = new HttpParams()
  // .set('username', 'nacoadmin')
  .set('facility', role ? role : '')
  .set('visit_start_date', startDate ? startDate : '')
  .set('visit_end_date', endDate ? endDate : '');
    return this.http.get(DataService.url + '/v1/report/expected-visit',{params});
  }
  else{
      let params = new HttpParams()
  // .set('username', 'nacoadmin')
  .set('facility', role ? role : '')
  .set('registration_start_date', startDate ? startDate : '')
  .set('registration_end_date', endDate ? endDate : '');
    return this.http.get(DataService.url + '/v1/report/expected-registration',{params});
  }
}
  /**
 * Get expected Patients Filter
 * 
 */
public expectedPatientsFilter(){
  return this.http.get(DataService.url + '/v1/report/expected-role');
}
  /**
 * Get daily dosage Filter
 * 
 */
public dailyDosageFilter(){
  return this.http.get(DataService.url + '/v1/report/dds-filter');
}
  /**
 * Get daily dosage report
 * @param page number
 * @param center name filter
 * @param district district filter
 * @param Year Year filter
 * @param Month Month filter
 */
public dailyDosage(page,center,district,month,year) {
  let params = new HttpParams()
  .set('page', page ? page : '')
  .set('center_name', center ? center : '')
  .set('center_district', district ? district : '')
  .set('Year', year ? year: '')
  .set('Month', month ? month : '');
  return this.http.get(DataService.url + '/v1/report/dds',{params});
}
  /**
 * Get daily dosage dispension report
 * @param page number
 * @param center name filter
 * @param district district filter
 * @param Year Year filter
 * @param Month Month filter
 */
public dailyDosageDispension(page,center,district,month,year) {
  let params = new HttpParams()
  // .set('username', 'dsacs')
  .set('page', page ? page : '')
  .set('center_name', center ? center : '')
  .set('center_district', district ? district : '')
  .set('Year', year ? year: '')
  .set('Month', month ? month : '');
  return this.http.get(DataService.url + '/v1/report/dds-dispensation',{params});
}
public patientSummaryFIlter(sacs,facility) {
  let params = new HttpParams()
  // .set('username', 'dsacs')
  .set('sacs', sacs ? sacs : '')
  .set('facility', facility ? facility : '')
  return this.http.get(DataService.url + '/v1/report/pss-filter',{params});
}
public patientSummary(page,sacs,facility,start,end) {
  let params = new HttpParams()
  // .set('username', 'dsacs')
  .set('sacs', sacs ? sacs : '')
  .set('facility', facility ? facility : '')
  .set('from_date', start ? start : '')
  .set('to_date', end ? end : '');
  return this.http.get(DataService.url + '/v1/report/pss',{params});
}
public patientDispensationDetailsFIlter(sacs,facility) {
  let params = new HttpParams()
  // .set('username', 'nacoadmin')
  .set('sacs', sacs ? sacs : '')
  .set('facility', facility ? facility : '')
  return this.http.get(DataService.url + '/v1/report/pdd-filter',{params});
}
public patientDispensationDetails(page,sacs,facility,start,end) {
  let params = new HttpParams()
  // .set('username', 'nacoadmin')
  .set('sacs', sacs ? sacs : '')
  .set('facility', facility ? facility : '')
  .set('from_date', start ? start : '')
  .set('to_date', end ? end : '');
  return this.http.get(DataService.url + '/v1/report/pdd',{params});
}
public patientLabFIlter(status,category) {
  let params = new HttpParams()
  // .set('username', 'nacoadmin')
  .set('status', status ? status : '')
  .set('category', category ? category : '')
  return this.http.get(DataService.url + '/v1/report/psl-filter',{params});
}
public patientLabStatusRegistration(status,category,start,end) {
  let params = new HttpParams()
  // .set('username', 'nacoadmin')
  .set('status', status ? status : '')
  .set('category', category ? category : '')
  .set('start_date', start ? start : '')
  .set('end_date', end ? end : '');
  return this.http.get(DataService.url + '/v1/report/psl-registration',{params});
}
public patientLabStatusInitiation(status,category,start,end) {
  let params = new HttpParams()
  // .set('username', 'nacoadmin')
  .set('status', status ? status : '')
  .set('category', category ? category : '')
  .set('start_date', start ? start : '')
  .set('end_date', end ? end : '');
  return this.http.get(DataService.url + '/v1/report/psl-initiation',{params});
}
public patientStatusDispensationFIlter(status,category) {
  let params = new HttpParams()
  // .set('username', 'nacoadmin')
  .set('status', status ? status : '')
  .set('category', category ? category : '')
  return this.http.get(DataService.url + '/v1/report/psdr-filter',{params});
}
publicpatientStatusDispensationRegistration(status,category,start,end) {
  let params = new HttpParams()
  // .set('username', 'nacoadmin')
  .set('status', status ? status : '')
  .set('category', category ? category : '')
  .set('start_date', start ? start : '')
  .set('end_date', end ? end : '');
  return this.http.get(DataService.url + '/v1/report/psdr-registration',{params});
}
public patientStatusDispensationInitiation(status,category,start,end) {
  let params = new HttpParams()
  // .set('username', 'nacoadmin')
  .set('status', status ? status : '')
  .set('category', category ? category : '')
  .set('start_date', start ? start : '')
  .set('end_date', end ? end : '');
  return this.http.get(DataService.url + '/v1/report/psdr-initiation',{params});
}
public patientStatusDispensationStatus(status,category,start,end) {
  let params = new HttpParams()
  // .set('username', 'nacoadmin')
  .set('status', status ? status : '')
  .set('category', category ? category : '')
  .set('start_date', start ? start : '')
  .set('end_date', end ? end : '');
  return this.http.get(DataService.url + '/v1/report/psdr-status',{params});
}
}
