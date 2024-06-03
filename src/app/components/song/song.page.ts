import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/comment';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {

  public comments: Comment[] = []
  constructor(private commentService: CommentService, private api: ApiService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.commentService.getAllComments().subscribe(allComments => {
      this.comments = allComments;
    });    
    let trackID = this.route.snapshot.paramMap.get('id');
    this.showTrack(trackID!);
  }

  showTrack(id: string){
    var iframe = document.createElement("iframe");
    iframe.src = "https://open.spotify.com/embed/track/" + id;
    iframe.width = "100%";
    iframe.height = "352";
    iframe.allowFullscreen;
    iframe.frameBorder = "0";
    iframe.allow = "encrypted-media";

    document.getElementById("songInfo")!.appendChild(iframe);
  }

}
