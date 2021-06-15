import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'lowdb/lib';
import { User } from 'src/user';
import { GetUserService } from '../get-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private userServeice: GetUserService) { }
  user: any;
  ngOnInit(): void {
    const id = Number(localStorage.getItem('id'))
   this.userServeice.findUserById(id).subscribe((user)=> this.user = user)
  }
  clearUser() {
    localStorage.removeItem('key')
    localStorage.removeItem('id')
  }
  getSrc (): string {    
    const src = `/assets/users/user${Number(localStorage.getItem('id'))}.jpg`    
    return src
  }
  getUsername () {
    return localStorage.getItem('key')
  }
  admin (): boolean {
    if (this.user.role === 'admin') {return true} 
    else { return false}
  
  }
 
}
