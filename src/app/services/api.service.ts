import { Injectable, input } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { catchError, generate, throwError } from 'rxjs';
import { Router, UrlSerializer } from '@angular/router';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  clientId = '63e7847d41474394a5d392f60af109b0';
  redirectUri = 'http://localhost:8100/home';
  scope = 'user-read-private user-read-email';
  // genresArr: any = [];
  songsArr: any = [];
  authUrl = new URL("https://accounts.spotify.com/authorize")
  tokenUrl = new URL("https://accounts.spotify.com/api/token")
  public apiKey: string = '4aawyAB9vmqN3uQ7FjRGTy';
  constructor(public http: HttpClient, private router: Router) { }

  // SPOTIFY     
  access_token: any = '';
  refresh_token: any = '';
  expires_in: any = '';

  currentToken = {
    get access_token() { return localStorage.getItem('access_token') || null },
    get refresh_token() { return localStorage.getItem('refresh_token') || null },
    get expires_in() { return localStorage.getItem('refresh_in') || null },
    get expires() { return localStorage.getItem('expires') || null },

    save: function (response: { access_token: string, refresh_token: string, expires_in: number }) {
      const { access_token, refresh_token, expires_in } = response;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('expires_in', String(expires_in));

      const now = new Date();
      const expiry = new Date(now.getTime() + (expires_in * 1000));
      localStorage.setItem('expires', expiry.toString());
    }
  }

  async generateRandomString() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(64));
    const randomString = values.reduce((acc, x) => acc + possible[x % possible.length], "");
    const code_verifier = randomString;

    const data = new TextEncoder().encode(randomString);
    const hashed = await crypto.subtle.digest('SHA-256', data);

    const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')

    window.localStorage.setItem('code_verifier', code_verifier);

    const authUrl = new URL(this.authUrl)
    const params = {
      response_type: 'code',
      client_id: this.clientId,
      scope: this.scope,
      code_challenge_method: 'S256',
      code_challenge: code_challenge_base64,
      redirect_uri: this.redirectUri
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    // window.alert("Click on the get access button")
  }

  async getToken(code: string) {
    let codeVerifier = localStorage.getItem('code_verifier');
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: this.clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: this.redirectUri,
        code_verifier: codeVerifier!,
      })
    }
    const body = await fetch(this.tokenUrl, payload);
    const response = await body.json();
    console.log(response)
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
  }

  async fetchProfile(token: string): Promise<any> {
    const freshToken = localStorage.getItem('access_token');
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${freshToken}`
      }
    });
    return await result.json();
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    const url = this.tokenUrl;

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken!,
        client_id: this.clientId
      }),
    }
    const body = await fetch(url, payload);
    const response = await body.json();
    console.log(response);
    localStorage.setItem('access_token', response.accessToken);
    localStorage.setItem('refresh_token', response.refreshToken);
  }
}














