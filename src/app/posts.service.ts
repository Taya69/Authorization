import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, find, map, tap } from 'rxjs/operators';
import { Post } from 'src/post';
import { Comment } from 'src/comment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor( private http: HttpClient) { }
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:3000/posts');
  }
  addPost(post : Post) : Observable<Post>{
    
    return this.http.post<Post>('http://localhost:3000/posts', post, this.httpOptions).pipe(         
      catchError(this.handleError<Post>('addPost'))
    );
    
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {     
      console.error(error); 

      return of(result as T);
    };
  }
  getLastId(): Observable<number> {
   // let posts: Post[] = [];
    return this.getPosts().pipe(
      map ((data:any) => {
        let id = data[data.length - 1].id    
        return id} )        
    )   
  }
  searchPosts(term: string): Observable<Post[]> {
    if (!term.trim()) {
      return this.http.get<Post[]>(`http://localhost:3000/posts`).pipe(           
        catchError(this.handleError<Post[]>('searchHeroes', []))
      );      
    }
    return this.http.get<Post[]>(`http://localhost:3000/posts?title=${term}`).pipe(          
      catchError(this.handleError<Post[]>('searchHeroes', []))
    );
  }
  deletePost(id: number): Observable<Post> {
    const url = `http://localhost:3000/posts/${id}`;  
    return this.http.delete<Post>(url, this.httpOptions).pipe(      
      catchError(this.handleError<Post>('deleteHero'))
    );
  }
  updatePost(post: Post): Observable<any> {
    return this.http.put(`http://localhost:3000/posts/${post.id}`, post, this.httpOptions).pipe(      
      catchError(this.handleError<any>('updateHero'))
    );
  }
  getPost(id: number): Observable<Post> {
    const url = `http://localhost:3000/posts/${id}`;
    return this.http.get<Post>(url).pipe(      
      catchError(this.handleError<Post>(`getHero id=${id}`))
    );
  }
  getComment(postId: number): Observable<Comment[]> {
    const url = `http://localhost:3000/comments?postId=${postId}`;
    return this.http.get<Comment[]>(url)    
  }
}
