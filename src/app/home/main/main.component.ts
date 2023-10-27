import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor(private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide()
    },5000);
    this.loadData();
  }

  loadData() {
    this.spinner.show('busSpinner');
    // Make an API call to load the bus data
    // Once the data is loaded, hide the spinner
    this.spinner.hide('busSpinner');
  }

}
