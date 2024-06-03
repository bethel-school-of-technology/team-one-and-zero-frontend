import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/comment';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {

  public comments: Comment[] = []
  public trackID: string | null = null;
  public spotifyUrl: SafeResourceUrl | null = null;
  constructor(private commentService: CommentService, private api: ApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer ) { }

  ngOnInit() {
    this.commentService.getAllComments().subscribe(allComments => {
      this.comments = allComments;
    });    
    this.trackID = this.route.snapshot.paramMap.get('id');
    if(this.trackID){
      this.spotifyUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://open.spotify.com/embed/track/' + this.trackID)
    }
  }

  // showTrack(id: string){
  //   var iframe = document.createElement("iframe");
  //   iframe.src = "https://open.spotify.com/embed/track/" + id;
  //   iframe.width = "100%";
  //   iframe.height = "352";
  //   iframe.allowFullscreen;
  //   iframe.frameBorder = "0";
  //   iframe.allow = "encrypted-media";

  //   document.getElementById("songInfo")!.appendChild(iframe);
  // }

}
