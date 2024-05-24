import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';
  loggedIn: boolean = false;
  constructor(private myUserService: UserService, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    // if(this.loggedIn = true){
    //   this.apiService.getToken().subscribe(
    //     tokenData => {
    //       localStorage.setItem('access_token', tokenData)
    //       console.log('Access Token; ', tokenData.access_token);
    //     },
    //     error=> {
    //       console.error('Error', error);
    //     }
    //   )
    // }
  }

  onSubmit() {
    this.myUserService.login(this.username, this.password).subscribe((response:any) => {
      window.alert("User Logged in Successfully"); // May change this to a prompt
      this.router.navigate(['home']);
      this.loggedIn = true;
      // this.apiService.getToken().subscribe(
      //   tokenData => {
      //     localStorage.setItem('access_token', tokenData)
      //     console.log('Access Token; ', tokenData.access_token);
      //   })
    }, error => {
      console.log('Error: ', error),
      window.alert('Unsuccessful Login'); // May change this to a prompt
    })
  }

}
