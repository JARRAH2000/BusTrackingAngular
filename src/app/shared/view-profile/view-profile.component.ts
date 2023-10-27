import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
/* import 'rxjs/add/operator/filter'; */
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {
  image: string | undefined
  name: string | undefined
  status: string | undefined

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .pipe(filter(params => params['name']))
      .subscribe(params => {
        console.log(params); // { name: "example" }
        this.name = params['name'];
      });

      this.route.queryParams
      .pipe(filter(params => params['image']))
      .subscribe(params => {
        console.log(params); // { name: "example" }
        this.image = params['image'];
      });

      this.route.queryParams
      .pipe(filter(params => params['status']))
      .subscribe(params => {
        console.log(params); // { name: "example" }
        this.status = params['status'];
      });
  }
}
