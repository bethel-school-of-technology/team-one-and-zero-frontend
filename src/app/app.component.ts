import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  user: User = new User;

  isAuthenticated: boolean = false;
  loggedIn: boolean = false;

  constructor(private myUserService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.myUserService.getCurrentUser().subscribe(response => {
      this.user = response;
      this.myUserService.isLoggedInSubj.next(!!response.userId)
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
    // window.location.href = '/login'
    this.router.navigate(['/login']);
  
  }

  // isLoggedIn() {
  //   let token = localStorage.getItem('myCommentToken')
  //   if(token === null){
  //     this.isAuthenticated = false;
  //   }else{
  //     this.isAuthenticated = true;
  //   }
  // }

}
