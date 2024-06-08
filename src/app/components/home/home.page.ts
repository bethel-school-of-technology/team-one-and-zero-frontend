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
  songsArr: any = [];
  searched = false;
  urlParams = new URLSearchParams(window.location.search);
  code = this.urlParams.get('code');
  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
   if(this.tokenExpired(this.accessToken!)){
    window.alert('Please click on the Refresh Access button to continue :)')
   }
  }

  tokenExpired(token: string){
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
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
    } else {
      this.api.generateRandomString()
    }
  }

  removeCodeFromUrl(): string {
    const url = new URL(window.location.href);
    url.searchParams.delete("code");
    return url.search ? url.href : url.href.replace('?', '');
  }

  // loginWithSpotify() {
  //   this.api.generateRandomString()

  // }

  getToken() {
    this.api.getToken(this.code!);
  }

  searchTracks() {
    let songs = this.searchTrack(this.accessToken!, this.searchStr)
    this.searched = true;
  }

  navigateToSongByID(id: any) {
    let songID = id
    this.router.navigate(['/song/', songID])
  }

  refreshToken() {
    this.api.refreshToken()
  }

  async searchTrack(token: string, item: string): Promise<any> {
    const freshToken = localStorage.getItem('access_token');
    const result = await fetch("https://api.spotify.com/v1/search?q=" + item + "&type=track&limit=10", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${freshToken}`
      }
    });
    if(result.status == 401){
      window.alert("Please log in with Spotify")
    }
    let track = await result.json();
    this.songsArr = track.tracks.items;
    console.log(this.songsArr)
    localStorage.setItem("track", track);    
    return track;
  }
}