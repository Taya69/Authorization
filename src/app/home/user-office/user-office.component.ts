import { Component, OnInit } from '@angular/core';
import { GetUserService } from 'src/app/get-user.service';
import { User } from 'src/user';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-office',
  templateUrl: './user-office.component.html',
  styleUrls: ['./user-office.component.css']
})
export class UserOfficeComponent implements OnInit {  
  firstName: string | undefined = '';
  lastName: string | undefined = '';
  user1: any;
  edit: boolean = true;
  constructor( private userService: GetUserService, private location: Location) { }
   
  ngOnInit(): void {
    const id = Number(localStorage.getItem('id')); 
    this.userService.findUserById(id).subscribe((user) => {this.user1 = user; this.firstName = user.firstName
    this.lastName = user.lastName})     
  }
  getSrc (): string {    
    const src = `/assets/users/user${Number(localStorage.getItem('id'))}.jpg`    
    return src
  }
  getUsername () {
    return this.user1.name
  }
  goBack () {
    this.location.back();
  }
  save () {
   if (!this.edit) {return}
    this.userService.editUser({
      name: this.user1.name,
      id: this.user1.id,
      password: this.user1.password,
      code: this.user1.code,
      firstName: this.firstName,
      lastName: this.lastName
    })  
  } 
}
