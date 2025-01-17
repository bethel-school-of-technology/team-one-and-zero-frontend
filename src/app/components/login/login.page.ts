import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';
  loggedIn: boolean = false;
  urlParams = new URLSearchParams(window.location.search);
  code = this.urlParams.get('code');
  constructor(private myUserService: UserService, private router: Router, private apiService: ApiService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {

  }

  onSubmit() {
    this.myUserService.login(this.username, this.password).subscribe((response: any) => {
      window.alert("Successful! Make sure to click on the 'Get Access after Log In' button found in the menu");
      this.router.navigate(['/home']);
      this.loggedIn = true;   
      this.loginSpotify();
    }, error => {
      console.log('Error: ', error);
      window.alert('Unsuccessful Login');
    });    
  }
  

  loginSpotify(){
    this.apiService.generateRandomString()
  }

}
