import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm, NgModel, NgModelGroup } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../shared/user.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  phoneRegex = /^[0-9]{10}$/;
  urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

  SignAs = [
    'Influencer',
    'Brand'
  ];
  Apps = [
    'Facebook',
    'Instagram'
  ];

  formAccountNumber = -1;
  formAddAccount = 0;
  formStepsNum = 0;
  formNumError = -1;
  showSucessMessage: boolean;
  serverErrorMessages: string;


  constructor(public userService: UserService) {

  }

  ngOnInit() {
    this.loadJsFile("assets/js/main.js");
  }


  public loadJsFile(url) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
  }

  onSubmit(form: NgForm) {
    console.log('Inside onSubmit function');
    console.log(form.name);
    form.value.social_media_handles = this.userService.selectedUser.social_media_handles;
    console.log(form.value);
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
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

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      category: '',
      phone: '',
      signUpAs: '',
      email: '',
      password: '',
      social_media_handles: []
    };
    // this.userService.social_media_handle = {
    //   socialMedia: '',
    //   user_id: '',
    //   followers: -1,
    //   profile_url: ''
    // };
    this.formStepsNum = 0;
    this.formNumError = -1;
    // form.resetForm();
    this.serverErrorMessages = '';
  }
  onNextClick(form, num: number) {

    console.log(form)

    if (num == 1) {
      if (form.name.email != '' && form.name.email.match(this.emailRegex) && form.name.password != '' && form.name.password.length > 3 && form.name.phone != '' && form.name.phone.match(this.phoneRegex) && form.name.signUpAs != '') {
        console.log("yayy");
        this.formStepsNum = num;
        this.formNumError = -1;
      }
      else {
        console.log("error");
        this.formNumError = num - 1;
      }
    }
    else if (num == 2) {
      if (form.name.category != '') {
        console.log("yayyyy");
        this.formStepsNum = num;
        this.formNumError = -1;
      }
      else {
        this.formNumError = num - 1;
      }
    }
    else {
      console.log(form);
      console.log(form.value);
      console.log(form.name);
      this.onSubmit(form);
      // if (form.name.profile_url != '' && form.name.profile_url.match(this.urlRegex) && form.name.user_id != '' && form.name.followers != '' && form.name.socialMedia != '') {
      //   console.log("yayy123");

      //   this.formNumError = -1;
      // }
      // else {
      //   console.log("error");
      //   this.formNumError = num - 1;
      // }
    }
  }
  onPrevClick(num: number) {
    console.log(num);
    this.formStepsNum = num;
    this.formNumError = -1;
  }

  onAddAccountClick() {
    this.formAddAccount++;
    this.formAccountNumber++;
  }

  onAddClick(form, num: number) {
    console.log(form.user_id);
    console.log(form.profile_url);
    console.log(this.userService.selectedUser.social_media_handles);
    if (form.profile_url != undefined && form.profile_url.match(this.urlRegex) && form.user_id != undefined && form.followers != undefined && form.socialMedia != undefined) {
      this.formAddAccount--;
      this.formNumError = -1;
      this.userService.selectedUser.social_media_handles.push({
        profile_url: form.profile_url,
        user_id: form.user_id,
        followers: form.followers,
        socialMedia: form.socialMedia
      });
      console.log(this.userService.selectedUser.social_media_handles);
    }
    else {
      console.log("error");
      this.formNumError = num - 1;
    }


  }

}
