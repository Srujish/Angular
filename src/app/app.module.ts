import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SampleReportComponent } from './components/reports/sample-report/sample-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library as fontLibrary } from '@fortawesome/fontawesome-svg-core';
import { faCalendar,  faClock } from '@fortawesome/free-regular-svg-icons';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { PatientDispensationSummary } from './components/reports/patient-dispensation-summary/patient-dispensation-summary.component';
import { ContractsNOAStatusComponent } from './components/reports/contracts-noa-status/contracts-noa-status.component';
import { RegimenSummaryStateComponent } from './components/reports/regimen-summary-state/regimen-summary-state.component';
import { RegimenSummaryFacilityComponent } from './components/reports/regimen-summary-facility/regimen-summary-facility.component';
import { IctcUsageReportComponent } from './components/reports/ictc-usage-report/ictc-usage-report.component';
import { StockSummaryFacilityComponent } from './components/reports/stock-summary-facility/stock-summary-facility.component';
import { ViralLoadReportComponent } from './components/reports/viral-load-report/viral-load-report.component';
import { StockLedgerStateComponent } from './components/reports/stock-ledger-state/stock-ledger-state.component';
import { StockLedgerFacilityComponent } from './components/reports/stock-ledger-facility/stock-ledger-facility.component';
import { StateLevelPerfomanceComponent } from './components/reports/state-level-perfomance/state-level-perfomance.component';
import { NacoLevelPerfomanceComponent } from './components/reports/naco-level-perfomance/naco-level-perfomance.component';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ExpectedPatientsComponent } from './components/reports/expected-patients/expected-patients.component';
import { DailyDosageComponent } from './components/reports/daily-dosage/daily-dosage.component';
import { PatitentStatusSummaryComponent } from './components/reports/patitent-status-summary/patitent-status-summary.component';
import { PatientDispensationDetailsComponent } from './components/reports/patient-dispensation-details/patient-dispensation-details.component';
import { PatientStatusLabReportComponent } from './components/reports/patient-status-lab-report/patient-status-lab-report.component';
import { PatientStatusDispensionComponent } from './components/reports/patient-status-dispension/patient-status-dispension.component';
fontLibrary.add(
  faCalendar,
  faClock
);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SampleReportComponent,
    PatientDispensationSummary,
    ContractsNOAStatusComponent,
    RegimenSummaryStateComponent,
    RegimenSummaryFacilityComponent,
    IctcUsageReportComponent,
    StockSummaryFacilityComponent,
    ViralLoadReportComponent,
    StockLedgerStateComponent,
    StockLedgerFacilityComponent,
    StateLevelPerfomanceComponent,
    NacoLevelPerfomanceComponent,
    ExpectedPatientsComponent,
    DailyDosageComponent,
    PatitentStatusSummaryComponent,
    PatientDispensationDetailsComponent,
    PatientStatusLabReportComponent,
    PatientStatusDispensionComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxDaterangepickerMd.forRoot(),
    NgbModule,
    HttpClientModule,
    HttpModule,
    NgbPaginationModule, 
    NgbAlertModule, 
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
