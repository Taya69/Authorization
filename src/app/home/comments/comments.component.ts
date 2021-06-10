import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/posts.service';
import { Post } from 'src/post';
import { Location } from '@angular/common';
import { Comment} from 'src/comment'
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private location: Location
  ) { }
 post: any;
 comments :Comment[] = []
  ngOnInit(): void {
    this.getPostAndComment()
  }
  getPostAndComment(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));   
    this.postService.getComment(id).subscribe((data) => this.comments = data)
  }
  goBack(): void {
    this.location.back();
  }
}
