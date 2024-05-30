import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  user: User = new User;

  constructor(private myUserService: UserService) {}

  ngOnInit(): void {
    this.myUserService.getCurrentUser().subscribe(response => {
      this.user = response;
    })
  }
}
