import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Campaign } from './campaign.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  selectedCampaign: Campaign = {
    productCategory: "",
    campaignSize: "",
    socialMedia: [],
    description: "",

  }

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods

  postUser(campaign: Campaign, user_id: string) {
    console.log(user_id);
    console.log(environment.baseUrl + '/' + user_id + '/create-campaign');
    return this.http.post(environment.baseUrl + '/brand/' + user_id + '/create-campaign', campaign, this.noAuthHeader);
  }
}
