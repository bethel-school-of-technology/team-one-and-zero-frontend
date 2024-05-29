import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  searched = false;
  loggedIn = false;
  urlParams = new URLSearchParams(window.location.search);
  code = this.urlParams.get('code');
  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.api.getGenres()
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
    this.api.generateRandomString().then(this.getToken)
    if(localStorage.getItem("access_token")){
      this.loggedIn = true;
    }

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
    this.searched = true;
    this.navigateToSong()
    console.log(localStorage.getItem("songId")); 
  }

  navigateToSong(){
    this.router.navigate(['/song'])
  }

  refreshToken(){
    this.api.refreshToken()
  }

}





