import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/posts.service';
import { Post } from 'src/post';
import { Location } from '@angular/common';
import { Comment} from 'src/comment'
import { LocalStorage } from 'lowdb/lib';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  @Input() post?: Post;
  @Input() comments?: Comment[];
  title : string = ''
  progressBar : boolean = true
  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPostAndComment()
  }
  getPostAndComment(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPost(id)
      .subscribe(post => {this.progressBar = false; this.post = post; this.title = post.title});
    this.postService.getComment(id).subscribe((data) => this.comments = data)
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.post) {
      this.post.title = this.title
      this.postService.updatePost(this.post)
        .subscribe(() => {localStorage.setItem('idPost', String(this.post?.id)); localStorage.setItem('namePost', String(this.post?.title)); 
        this.goBack()});
    }
  }
  getTitle () {
    const title = this.post?.title.substring(0, this.post.title.length)
    return title
  }

}
