import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";
import { NgForm, NgModel, NgModelGroup } from '@angular/forms';
@Component({
  selector: 'app-brand-influencers-list',
  templateUrl: './brand-influencers-list.component.html',
  styleUrls: ['./brand-influencers-list.component.scss']
})
export class BrandInfluencersListComponent implements OnInit {
  list;
  str;
  constructor(public http: HttpClient, public router: Router) { }

  ngOnInit(): void {
    this.http.get(environment.baseUrl + '/brand/influencers-list').subscribe(
      res => {
        console.log(res['influencers']);
        this.list = res['influencers'];
      },
      err => {
        console.log(err);

      });

    console.log(this.list);
    console.log(environment.baseUrl + '/brand/influencers-list');
  }

  onSubmit(form: NgForm) {
    console.log('Inside onSubmit function');
    console.log(form.value.socialMedia);
    this.str = "?"
    if (form.value.priceMin != undefined) {
      this.str += "price_min=" + form.value.priceMin;
    }
    if (form.value.priceMax != undefined) {
      if (this.str != "?") {
        this.str += "&";
      }
      this.str += "price_max=" + form.value.priceMax;
    }
    if (form.value.reachMin != undefined) {
      if (this.str != "?") {
        this.str += "&";
      }
      this.str += "reach_min=" + form.value.reachMin;
    }
    if (form.value.reachMax != undefined) {
      if (this.str != "?") {
        this.str += "&";
      }
      this.str += "reach_max=" + form.value.reachMax;
    }
    if (form.value.socialMedia != undefined) {
      if (this.str != "?") {
        this.str += "&";
      }
      this.str += "social_media=" + form.value.socialMedia;
    }
    this.http.get(environment.baseUrl + '/brand/influencers-list' + this.str).subscribe(
      res => {
        console.log(res['influencers']);
        this.list = res['influencers'];
      },
      err => {
        console.log(err);

      });
    this.router.navigateByUrl('/brand/influencers-list' + this.str);
  }

}
