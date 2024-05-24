import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment'

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseURL: string = "http://localhost:5167/api/comment";
  tokenKey: string = "myCommentToken";

  constructor(private http: HttpClient) { }

  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.baseURL);
  }

  getComment(commentId: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.baseURL}/${commentId}`)
  }

  createComment(newComment: Comment): Observable<Comment> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }

    return this.http.post<Comment>(this.baseURL, newComment, { headers: reqHeaders });
  }

  updateComment(newComment: Comment): Observable<Comment> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }

    return this.http.put<Comment>(`${this.baseURL}/${newComment.commentID}`, newComment, { headers: reqHeaders });
  }

  deleteComment(commentId: number): Observable<any> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }

    return this.http.delete<any>(`${this.baseURL}/${commentId}`, { headers: reqHeaders });
  }
}
