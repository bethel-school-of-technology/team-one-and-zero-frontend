import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {

  public comments: Comment[] = []

  constructor(private commentService: CommentService ) { }

  ngOnInit() {
    this.commentService.getAllComments().subscribe(allComments => {
      this.comments = allComments;
    });
  }

}
