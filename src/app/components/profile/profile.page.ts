import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  panelOpenState = false;

  presentUser: User = new User;

  loggedInUser: User = new User;

  userComments: Comment[] = [];

  userName: string = "";

  constructor(private myUserService: UserService, private myCommentService: CommentService, private actRouter: ActivatedRoute) { }

  ngOnInit() {
    this.myUserService.getCurrentUser().subscribe(response => {
      this.loggedInUser = this.presentUser = response;
      this.userName = this.presentUser.username ?? '';
      console.log(this.loggedInUser);
      console.log(this.presentUser);

      const name = this.actRouter.snapshot.paramMap.get("username") ?? '';
      console.log(name);
  
      if (name !== '') {
        this.userName = name;
        this.myUserService.getUserByUsername(name).subscribe(response => {
          this.presentUser = response;
        })
      }
  
    
      // this.userName = this.presentUser.username ?? '';

      this.loadUserComments();

    })


  }

  loadUserComments() {
    this.myCommentService.getCommentsByUsername(this.userName).subscribe(response => {
      this.userComments = response;
    })
  }

  editComment(comment: Comment) {
    this.myCommentService.updateComment(comment).subscribe(() => {
      console.log(comment);
      this.loadUserComments();
    })
  }

  deleteComment(id: number) {
    this.myCommentService.deleteComment(id).subscribe(() => {
      console.log("The comment has been deleted");
      this.loadUserComments();
    })
  }

  prompt(comment: Comment) {
    this.myCommentService.showPrompt('Hi', 'Edit comment:').subscribe(response => {
      
      if(response == null || response == "") {
        return;
      }
      
      comment.description = response;
      this.editComment(comment);
    })
  }

}
