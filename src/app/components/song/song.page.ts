import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/comment';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {
  comment: Comment = new Comment;
  comments: Comment[] = []
  currentUser: User = new User;
  public trackID: string | null = null;
  public spotifyUrl: SafeResourceUrl | null = null;
  constructor(private commentService: CommentService, private api: ApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router, private user: UserService ) { }

  ngOnInit() {
      
    this.trackID = this.route.snapshot.paramMap.get('id');
    if(this.trackID){
      this.spotifyUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://open.spotify.com/embed/track/' + this.trackID)
    }

    this.user.getCurrentUser().subscribe(response => {
      this.currentUser = response;
    })
    
    this.currentUserAndId()
    this.callComments()
    this.getSongId()
      console.log(this.trackID);
  }

  getSongId(){
    let songId = this.route.snapshot.paramMap.get('id');
    this.comment.songId = songId!
  }

  currentUserAndId(){
    this.user.getCurrentUser().subscribe(response => {
      this.comment.username = response.username;
      console.log(response.username)
    })
    
  }

  createComment(){
    this.commentService.createComment(this.comment).subscribe(() => {
      
    }, error => {
      console.log('Error:', error)
      if(error.status === 401){
        this.router.navigate(['login'])
      }
    })
    window.location.reload()
  }

  callComments(){
   this.commentService.getCommentsBySongID(this.trackID!).subscribe(allComments => {
      this.comments = allComments;
    });   
  }

  editComment(comment: Comment) {
    this.commentService.updateComment(comment).subscribe(() => {
      console.log(comment);
      this.callComments();
    })
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe(() => {
      console.log("The comment has been deleted");
      this.callComments();
    })
  }

  prompt(comment: Comment) {
    this.commentService.showPrompt('Hi', 'Edit comment:').subscribe(response => {

      if(response == null || response == "") {
        return;
      }

      comment.description = response;
      this.editComment(comment);
    })
  }
  
}
