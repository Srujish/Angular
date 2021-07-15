# SochReport

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Deployment

## Preparing Build
* Edit the index.html and change the base href from / to ./
* Remove all user selection drop down from the HTML files
* Comment all username parameters in the data.service.ts
* Updated the config.ts and set the url to /api
* Prepare a deployment folder where we will deploy all the reports. We will use this as the temporary staging folder before we copy the binaries to the server.
* Create the following directories in the deployment folder
> * contracts_noa_status
> * ictc_usage
> * patient_dispensation_summary
> * regimen_summary-facility
> * regimen_summary-state

NOTE: These changes should not be committed to the repository.

## Building each Report
For every report, you will have to build it separately.

1. Updated the app-routing,module.ts and replace the root path with the report component class.
2. Build the report by running
> ng build --prod
3. Copy the content of the dist folder to prepared deployment folder
4. Open the main.*.js file and replace the loading.gif path with /static/assets/loading.gif

## Deploying the Reports
1. Delete the report folders from /superset/static/reports
> * contracts_noa_status
> * ictc_usage
> * patient_dispensation_summary
> * regimen_summary-facility
> * regimen_summary-state
2. Copy the new reports to /superset/static/reports

NOTE: It is important to delete the actual reports before copying. As the JS names will change