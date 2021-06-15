import { AfterViewInit, ApplicationRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
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
export class PostsComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator') refPaginator: ElementRef | undefined
  post: string = '';
  length: number = 100;
  pageSize: number = 10;
  pageIndex = 0;
  pageSizeOptions: Number[] = [5, 10, 25, 100]
  constructor(private postService: PostsService, public dialog: MatDialog) {    
   }
 // displayedColumns: string[] = ['post', 'edit', 'delete'];
  dataSource : Post[] = []; 
  pageSlice : Post[] = [];
  posts$!: Observable<Post[]>;
  progressBar : boolean = true
  private searchTerms = new BehaviorSubject<string>('');
  log () {console.log(this.pageSize)}
  ngOnInit(): void {  
    this.postService.getPosts().subscribe((posts)=> {this.progressBar = false});
    this.postService.searchPosts('').subscribe((res) => {
     // console.log(1);
      this.dataSource = res;
     // 
     if (this.dataSource.length) {
      console.log(2);
      this.sliceForTemplate()}
    })
    this.posts$ = this.searchTerms.pipe(      
      debounceTime(300),      
      //distinctUntilChanged(),      
      switchMap((term: string) => {return this.postService.searchPosts(term)} ),
    ); 
      
  }
  ngAfterViewInit () {
    console.log(Object.getPrototypeOf(this.refPaginator))
  }
  onChanged(term: string) {
    this.searchTerms.next(term);
    this.postService.searchPosts(term).subscribe((res) => {this.dataSource = res; 
      if (term.trim() === '') {
        this.sliceForTemplate()
      } else {
        this.pageSlice = res 
      }
    })
       
  }
  addPost () {
    const DialogRef = this.dialog.open(AdditingOfPostComponent);
    DialogRef.afterClosed().subscribe((res) => this.postService.addPost(res).subscribe(() => {this.searchTerms.next(' ')
    this.dataSource.unshift(res); this.sliceForTemplate();
}
  ))  
  } 
  delete (el : Post) {  
    let index = this.dataSource.indexOf(el)  
    this.postService.deletePost(el.id).subscribe(_=> {this.searchTerms.next(' '); this.dataSource.splice(index, 1); this.sliceForTemplate()})    
  } 
  onPageChange (event: any) {   
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.sliceForTemplate()  
  }
  sliceForTemplate () {
    let startIndex;
    if (this.pageIndex === 0) {
      startIndex = 0
    } else {
      startIndex = this.pageIndex + this.pageSize;
    }
    
    let endIndex = startIndex + this.pageSize;
    if (endIndex > this.dataSource.length) {
      endIndex = this.dataSource.length
    }
    this.pageSlice = this.dataSource.slice(startIndex, endIndex)
  }
  confirm (post : Post) {

    const DialogRef = this.dialog.open(ConfimationDialogPost, {      
      data: {id : post.id}
    });
    DialogRef.afterClosed().subscribe((el) => {
      if (el === 'delete') {
        this.delete(post) 
      }
      })
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

@Component({
  selector: 'confimation-dialog',
  templateUrl: 'confirmation-dialog.html',
  styleUrls: ['./posts.component.css']
})
export class ConfimationDialogPost {
  
constructor (@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogRef2: MatDialogRef<ConfimationDialogPost>,
private postService: PostsService) {}
closeDialog () {
  this.dialogRef2.close("notDelete")
}

delete(): void {  
  this.postService.deletePost(this.data.id);
  this.dialogRef2.close("delete")
}
}