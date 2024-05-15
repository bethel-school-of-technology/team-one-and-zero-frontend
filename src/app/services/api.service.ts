import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiKey : any='7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B';
  constructor(public http : HttpClient) { }

  getSongs(){
    let url = 'https://api.spotify.com/v1/tracks'+this.apiKey;
    return this.http.get(url);
  }
}
