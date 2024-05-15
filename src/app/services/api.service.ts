import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  clientId: string = 'CLIENT_ID';
  clientSecret: string = 'CLIENT_SECRET';
  public apiKey : any='7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B';
  constructor(public http : HttpClient) { }

  getSongs(){
    let url = 'https://api.spotify.com/v1/tracks?ids='+this.apiKey;
    return this.http.get(url);
  }

  // getToken = async () => {
  //   const result = await fetch(`https://accounts.spotify.com/api/token`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type' : 'application/x-www-form-urlencoded',
  //       'Authorization' : 'Basic' + btoa(this.clientId + '' + this.clientSecret)
  //     },
  //     body: 'grant_type=client_credentials'
  //   });
  //   const data = await result.json();
  //   return data.access_token;
  // }

  

  // getTracks = async (token: string) => {
  //   const limit = 10;
  //   const result = await fetch(`?limit=${limit}`,{
  //     method: 'GET',
  //     headers: {'Authorization' : 'Bearer' + token}
  //   });

  //   const data = result.json();
  //   return data;
    
  // }


}

