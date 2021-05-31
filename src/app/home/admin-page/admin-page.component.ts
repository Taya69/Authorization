import { Component, OnInit } from '@angular/core';
import { GetUserService } from 'src/app/get-user.service';
import { User } from 'src/user';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  
  nameUser : string = '';
  passwordUser : string = '';
  codeUser : string = ''
  users: User[] = []; 
  addEdit: boolean = true;
  editingUserId : number = 0

  constructor(private userService: GetUserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }
  add(event: any): void {
    if (this.addEdit) {
      let idAdding = 0;
      this.userService.getLastId().subscribe(id => idAdding = id+1);    
      const userAdding = {
        id: idAdding,
        name: event.target[0].value,
        password: event.target[1].value,
        code: event.target[2].value
      }      
      this.userService.addUser(userAdding);
    } else {
      const userEdiding = {
        id: this.editingUserId,
        name: event.target[0].value,
        password: event.target[1].value,
        code: event.target[2].value
      }     
      this.userService.editUser(userEdiding)
      this.addEdit = true;
    }
   
  }
  delete(user: User): void {   
    this.userService.deleteUser(user.id);
  }

}
