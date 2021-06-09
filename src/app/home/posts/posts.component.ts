import { ApplicationRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, interval, Observable, of, Subject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PostsService } from 'src/app/posts.service';
import { Post } from 'src/post';
import { DialogData } from '../admin-page/admin-page.component';
import {SearchComponent} from '../posts/search/search.component'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  post: string = ''
  constructor(private postService: PostsService, public dialog: MatDialog) {    
   }
 // displayedColumns: string[] = ['post', 'edit', 'delete'];
  dataSource : Post[] = []; 
  posts$!: Observable<Post[]>;
  progressBar : boolean = true
  private searchTerms = new BehaviorSubject<string>('');
  ngOnInit(): void {  
    this.postService.getPosts().subscribe((posts)=> {this.progressBar = false});
    this.postService.searchPosts('').subscribe((res) => this.dataSource = res)
    this.posts$ = this.searchTerms.pipe(      
      debounceTime(300),      
      //distinctUntilChanged(),      
      switchMap((term: string) => {return this.postService.searchPosts(term)} ),
    ); 
      
  }
  onChanged(term: string) {
    this.searchTerms.next(term);
    this.postService.searchPosts(term).subscribe((res) => this.dataSource = res)   
  }
  addPost () {
    const DialogRef = this.dialog.open(AdditingOfPostComponent);
    DialogRef.afterClosed().subscribe((res) => this.postService.addPost(res).subscribe(() => {this.searchTerms.next(' ')
  this.dataSource.push(res)}))  
  } 
  delete (el : Post) {  
    let index = this.dataSource.indexOf(el)  
    this.postService.deletePost(el.id).subscribe(_=> {this.searchTerms.next(' '); this.dataSource.splice(index, 1)})    
  } 
 
}

@Component({
  selector: 'app-add-post',
  templateUrl: './additingOfPost.component.html',
  styleUrls: ['./posts.component.css']
})
export class AdditingOfPostComponent implements OnInit {  
  post: string = ''
  constructor(private postService: PostsService, @Inject(MAT_DIALOG_DATA) public data: DialogData,
  public dialogRef: MatDialogRef<AdditingOfPostComponent>) {    
   }
  
  ngOnInit(): void {}  
  addPost () {
     let id = 0;
     this.postService.getLastId().subscribe((data) => id = data+1)
     let author = String(localStorage.getItem('key'));
    const post1 = { "id": id, "title": this.post, "author": author};      
    this.dialogRef.close(post1)  
  }  
}