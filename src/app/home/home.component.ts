import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'lowdb/lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }
  clearUser() {
    localStorage.removeItem('key')
    localStorage.removeItem('id')
  }
  getSrc (): string {    
    const src = `/assets/users/user${Number(localStorage.getItem('id'))}.jpg`
    return src
  }
}
