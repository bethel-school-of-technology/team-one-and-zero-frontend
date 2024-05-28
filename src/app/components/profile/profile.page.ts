import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  presentUser: User = new User;

  // accessToken = localStorage.getItem('access_token');

  constructor(private myUserService: UserService, private actRouter: ActivatedRoute) { }

  ngOnInit() {
    const userName = this.actRouter.snapshot.paramMap.get("username") ?? "";

    this.myUserService.getUserByUsername(userName).subscribe(response => {
      this.presentUser = response;
    })
  }
}
