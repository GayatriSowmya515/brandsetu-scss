import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel, NgModelGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";

import { UserService } from '../shared/user.service';
import { CampaignService } from '../shared/campaign.service'

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})


export class BrandComponent implements OnInit {
  userDetails;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  id: string;

  constructor(private userService: UserService, public campaignService: CampaignService, public route: ActivatedRoute, public router: Router) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        console.log(res);
      },
      err => {
        console.log(err);

      }
    );
  }

  onSubmit(form: NgForm) {
    console.log('Inside onSubmit function');
    console.log(form.value);
    this.campaignService.postUser(form.value, this.userDetails._id).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        console.log("Sucessfully posted");
        this.router.navigateByUrl('/brand/influencers-list');
        // this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }

}
