import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  newUser: User = new User();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  signUp(){
    this.userService.signUp(this.newUser).subscribe(() => {
      window.alert("User Registered Successfully");
      this.router.navigate(['home']);
    }, error => {
      window.alert("User Registraiton Error");
      console.log('Error: ', error)
    });
  }
}
