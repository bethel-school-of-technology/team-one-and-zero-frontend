import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { Comment } from 'src/app/models/comment';
import { ApiService } from 'src/app/services/api.service';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  presentUser: User = new User;

  userComments: Comment[] = [];

  userName: string = "";

  // accessToken = localStorage.getItem('access_token');

  constructor(private myUserService: UserService, private myCommentService: CommentService, private actRouter: ActivatedRoute) { }

  ngOnInit() {
    const name = this.actRouter.snapshot.paramMap.get("username") ?? "";
    this.userName = name;

    this.myUserService.getUserByUsername(this.userName).subscribe(response => {
      this.presentUser = response;
    })

    this.loadUserComments();
  }

  loadUserComments() {
    this.myCommentService.getCommentsByUsername(this.userName).subscribe(response => {
      this.userComments = response;
    })
  }

}
