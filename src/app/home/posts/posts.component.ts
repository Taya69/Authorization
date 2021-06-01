import { ApplicationRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, interval, Observable, of, Subject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PostsService } from 'src/app/posts.service';
import { Post } from 'src/post';
import {SearchComponent} from '../posts/search/search.component'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  constructor(private postService: PostsService) {
    
   }
 // displayedColumns: string[] = ['post', 'edit', 'delete'];
  dataSource : Post[] = []; 
  posts$!: Observable<Post[]>;
  private searchTerms = new BehaviorSubject<string>('');
  ngOnInit(): void {  
    this.postService.getPosts().subscribe((posts)=> this.dataSource = posts);
    this.posts$ = this.searchTerms.pipe(      
      debounceTime(300),      
      //distinctUntilChanged(),      
      switchMap((term: string) => {return this.postService.searchPosts(term)} ),
    ); 
      
  }
  onChanged(term: string) {
    this.searchTerms.next(term);   
  }
  addPost (event: any) {
     let id = 0;
     this.postService.getLastId().subscribe((data) => id = data+1)
     let author = String(localStorage.getItem('key'));
    const post1 = { "id": id, "title": event.target[0].value, "author": author};   
    this.postService.addPost(post1).subscribe(() => {this.searchTerms.next(' '); } );    
  } 
  delete (el : Post) {
    this.postService.deletePost(el.id).subscribe(_=> {this.searchTerms.next(' '); })
  } 
}
