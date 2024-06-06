import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { Comment } from '../models/comment'
import { Dialog } from '@capacitor/dialog';

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

  getCommentsByUsername(username: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseURL}/${username}`)
  }

  getCommentsBySongID(songId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseURL}/song/${songId}`)
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

  showPrompt(title: string, message: string): Observable<string> {
    return from(Dialog.prompt({
      title,
      message
    })).pipe(map(result => {
      return result.value;
    }))
  }
  
}
