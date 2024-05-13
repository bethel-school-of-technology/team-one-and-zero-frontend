import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment'

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseURL: string = "http://localhost:5167/api/comment";

  constructor(private http: HttpClient) { }

  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.baseURL);
  }

  getComment(commentId: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.baseURL}/${commentId}`)
  }

  createComment(newComment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.baseURL, newComment);
  }

  updateComment(newComment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.baseURL}/${newComment.commentId}`, newComment);
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/${commentId}`);
  }
}
