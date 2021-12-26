import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
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

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods

  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register', user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }


  //Helper Methods

  setToken(token: string) { //token is the response from the server after login 
    localStorage.setItem('token', token);
  }

  getToken() { //get the token from the local storage
    return localStorage.getItem('token');
  }

  deleteToken() { //delete the token from the local storage
    localStorage.removeItem('token');
  }

  getUserPayload() { //get the user payload from the token
    var token = this.getToken(); //get the token from the local storage
    if (token) { //if token is not null
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() { //check if the user is logged in
    var userPayload = this.getUserPayload(); //get the user payload from the token
    if (userPayload) //if user payload is not null
      return userPayload.exp > Date.now() / 1000; //check if the token is expired
    else //if user payload is null
      return false;
  }
}
