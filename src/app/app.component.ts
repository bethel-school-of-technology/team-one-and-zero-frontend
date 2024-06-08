import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  user: User = new User;
  urlParams = new URLSearchParams(window.location.search);
  code = this.urlParams.get('code');
  isAuthenticated: boolean = false;
  loggedIn: boolean = false;

  constructor(private myUserService: UserService, private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.myUserService.getCurrentUser().subscribe(response => {
      if(response !== null) {
        this.user = response;
        this.myUserService.isLoggedInSubj.next(!response.userId)
      } else {
        return;
      }
    })

    this.myUserService.isLoggedInSubj.subscribe(isLoggedIn => {
      this.isAuthenticated = isLoggedIn;
      this.isAuthenticated = isLoggedIn;
    })

  }


  logout() {
    this.myUserService.isLoggedInSubj.next(false);
    localStorage.removeItem('myCommentToken')
    if(localStorage.getItem('myCommentToken') === null){
      console.log('its been deleted')
    }

    this.router.navigate(['/login']);
  
  }

  getToken() {
    this.api.getToken(this.code!);
  }

  refreshToken() {
    this.api.refreshToken()
  }


}
