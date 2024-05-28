import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  codeVerifier = localStorage.getItem('code_verifier');
  accessToken = localStorage.getItem('access_token')
  searchStr!: string;
  urlParams = new URLSearchParams(window.location.search);
  code = this.urlParams.get('code');
  constructor(private api: ApiService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    

  }

  saveToken() {
    const code = this.route.snapshot.queryParams['code'];
    console.log(code);
    if (code) {
     this.api.getToken(code).then(token => {
      this.api.currentToken.save(token!);

      const updatedUrl = this.removeCodeFromUrl();
      window.history.replaceState({}, document.title, updatedUrl)
     })
    } else{
      this.api.generateRandomString()
    }
  }

  removeCodeFromUrl(): string {
    const url = new URL(window.location.href);
    url.searchParams.delete("code");
    return url.search ? url.href : url.href.replace('?', '');
  }

  loginWithSpotify() {
    this.api.generateRandomString();
  }

  getToken() {
    this.api.getToken(this.code!);
  }

  fetchProfile() {
    let profile = this.api.fetchProfile(this.accessToken!)
    console.log(profile);
  }

  searchArtist(){
    let songs = this.api.searchTrack(this.accessToken!, this.searchStr)
    console.log(songs); 
  }

  

  refreshToken(){
    this.api.refreshToken()
  }

}





