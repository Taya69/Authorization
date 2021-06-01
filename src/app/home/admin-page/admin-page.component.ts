import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GetUserService } from 'src/app/get-user.service';
import { User } from 'src/user';

export interface DialogData {  
  name: string;
  edit: boolean;
  password: string;
  code: string;
  id: number
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {  
  
  users: User[] = []; 
  addEdit: boolean = true;  

  constructor(private userService: GetUserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
  } 
  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }
  add () {
    this.addEdit = false;
    const dialogRef = this.dialog.open(EditDeleteDialog, {      
      data: {name: '', edit: this.addEdit, password: '', code: '', id : 100}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
    });
  }
  delete(user: User): void { 
    if (localStorage.getItem('key') === user.name) {return}  
  this.userService.deleteUser(user.id);
  }
  edit (user : User) {
    this.addEdit = true;
    const dialogRef = this.dialog.open(EditDeleteDialog, {      
      data: {name: user.name, edit: this.addEdit, password: user.password, code: user.code, id : user.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
    });
  }

}

@Component({
  selector: 'edit-delete-dialog',
  templateUrl: 'edit-delete-dialog.html',
})
export class EditDeleteDialog {
  constructor(  public dialogRef: MatDialogRef<EditDeleteDialog>, private userService: GetUserService, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    loginForm: FormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    }) 
    save (event: any) {
        if (!this.loginForm.valid) {
      return;
        }     
      if (!this.data.edit) {           
        let idAdding = 0;
        this.userService.getLastId().subscribe(id => idAdding = id+1);    
        const userAdding = {
          id: idAdding,
          name: event.target[0].value,
          password: event.target[1].value,
          code: event.target[2].value
        } 
        // if (this.userService.testNameOfUser(event.target[0].value)) {
        //   alert('this mail occupied')
        //   return
        // }        
        this.userService.addUser(userAdding);
      } else { 
           
        const userEdiding = {
          id: this.data.id,
          name: event.target[0].value,
          password: event.target[1].value,
          code: event.target[2].value
        }     
        this.userService.editUser(userEdiding)        
      }
     this.dialogRef.close()
    }
}
