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
      user_id: '',
      category: '',
      profile_url: '',
      phone: '',
      signUpAs: '',
      followers: '',
      socialMedia: '',
      email: '',
      password: ''
    };
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
      if (form.name.profile_url != '' && form.name.profile_url.match(this.urlRegex) && form.name.user_id != '' && form.name.followers != '' && form.name.socialMedia != '') {
        console.log("yayy123");
        this.onSubmit(form);
        this.formNumError = -1;
      }
      else {
        console.log("error");
        this.formNumError = num - 1;
      }
    }
  }
  onPrevClick(num: number) {
    console.log(num);
    this.formStepsNum = num;
    this.formNumError = -1;
  }

}
