import { Component, OnInit } from '@angular/core';
import { GetUserService } from 'src/app/get-user.service';
import { User } from 'src/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-office',
  templateUrl: './user-office.component.html',
  styleUrls: ['./user-office.component.css']
})
export class UserOfficeComponent implements OnInit {  
  
  constructor( private userService: GetUserService, private location: Location) { }

  ngOnInit(): void {
  }
  getSrc (): string {    
    const src = `/assets/users/user${Number(localStorage.getItem('id'))}.jpg`    
    return src
  }
  getUsername () {
    return localStorage.getItem('key')
  }
  goBack () {
    this.location.back();
  }
  // getUserPassword () : string {
  //   const id = Number(localStorage.getItem('id'));
  //   let user1 : User;
  //   this.userService.findUserById(id).subscribe((user) => user1 = user)
    
  //   return user1.password
    
  // }
}
