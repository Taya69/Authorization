import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PostsService } from 'src/app/posts.service';
import { Post } from 'src/post';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() onChanged = new EventEmitter<string>();  

  constructor(private postService: PostsService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.onChanged.emit(term)    
  }
  ngOnInit(): void {
   
  }
}
