import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  accessToken = localStorage.getItem('access_token');
  constructor(private api: ApiService) { }

  ngOnInit() {
  }
}
