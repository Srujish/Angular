import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientDispensationSummary } from './components/reports/patient-dispensation-summary/patient-dispensation-summary.component';
import { RegimenSummaryStateComponent } from './components/reports/regimen-summary-state/regimen-summary-state.component';
import { ContractsNOAStatusComponent } from './components/reports/contracts-noa-status/contracts-noa-status.component';
import { RegimenSummaryFacilityComponent } from './components/reports/regimen-summary-facility/regimen-summary-facility.component';
import { IctcUsageReportComponent } from './components/reports/ictc-usage-report/ictc-usage-report.component';
import { StockSummaryFacilityComponent } from './components/reports/stock-summary-facility/stock-summary-facility.component';
import { ViralLoadReportComponent } from './components/reports/viral-load-report/viral-load-report.component';
import { StockLedgerStateComponent } from './components/reports/stock-ledger-state/stock-ledger-state.component';
import { StockLedgerFacilityComponent } from './components/reports/stock-ledger-facility/stock-ledger-facility.component';
import { StateLevelPerfomanceComponent } from './components/reports/state-level-perfomance/state-level-perfomance.component';
import { NacoLevelPerfomanceComponent } from './components/reports/naco-level-perfomance/naco-level-perfomance.component';
import { ExpectedPatientsComponent } from './components/reports/expected-patients/expected-patients.component';
import { DailyDosageComponent } from './components/reports/daily-dosage/daily-dosage.component';
import { PatitentStatusSummaryComponent } from './components/reports/patitent-status-summary/patitent-status-summary.component';
import { PatientDispensationDetailsComponent } from './components/reports/patient-dispensation-details/patient-dispensation-details.component';
import { PatientStatusLabReportComponent } from './components/reports/patient-status-lab-report/patient-status-lab-report.component';
import { PatientStatusDispensionComponent } from './components/reports/patient-status-dispension/patient-status-dispension.component';
const routes: Routes = [{
    path: '', 
    component: PatientStatusDispensionComponent,
  }, {
    path: 'patient_dispensation_summary',
    component: PatientDispensationSummary,
  }, {
    path: 'contracts_noa_status',
    component: ContractsNOAStatusComponent,
  }, {
    path: 'regimen_summary-state',
    component: RegimenSummaryStateComponent,
  }, {
    path: 'regimen_summary-facility',
    component: RegimenSummaryFacilityComponent,
  }, {
    path: 'ictc_usage_report',
    component: IctcUsageReportComponent,
  }, {
    path: 'stock_summary-facility',
    component: StockSummaryFacilityComponent
  },
  {
    path: 'facility_stock_ledger',
    component: StockLedgerFacilityComponent
  },
  {
    path: 'state_stock_ledger',
    component: StockLedgerStateComponent
  },
  {
    path: 'viral_load_report',
    component: ViralLoadReportComponent
  },
  {
    path: 'state-level-perfomance',
    component: StateLevelPerfomanceComponent
  },
  {
    path: 'naco-level-perfomance',
    component: NacoLevelPerfomanceComponent
  },
    {
    path: 'expected-patients',
    component: ExpectedPatientsComponent
  },
   {
    path: 'daily-dosage',
    component: DailyDosageComponent
  },
     {
    path: 'patient-status-summary',
    component: PatitentStatusSummaryComponent
  },
  {
    path: 'patient-dispensation-details',
    component: PatientDispensationDetailsComponent
  },
  {
    path: 'patient-lab-status',
    component: PatientStatusLabReportComponent
  },
    {
    path: 'patient-status-dispension',
    component: PatientStatusDispensionComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
