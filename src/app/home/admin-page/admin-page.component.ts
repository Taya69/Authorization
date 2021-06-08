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
  id: number;
  
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page-card.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {  
  
  users: User[] = []; 
  addEdit: boolean = true;  
  cols: number = 3;
  progressBar: boolean = true;
  constructor(private userService: GetUserService, public dialog: MatDialog) { }

  ngOnInit() {    
    this.getUsers(); 
    if (screen.width > 800) {
      this.cols = 3
   } else { 
   if (screen.width <=800 && screen.width > 560) {
     this.cols = 2
  } else {
    this.cols = 1
  }
  } 
}
getAbleOfButton(user: User) {
  return user.name === localStorage.getItem('key')
}
  onResize(event : any) {
    if (event.target.innerWidth > 800) {
       this.cols = 3
    } else { 
    if (event.target.innerWidth <=800 && event.target.innerWidth > 560) {
      this.cols = 2
   } else {
     this.cols = 1
   }
  }
    }
  getAvatar(user: User): string {    
    let url = `/assets/users/user${user.id}.jpg`
    return url
  }
  onImageLoad () {
    let img = document.getElementById('test')
    //try {img.src = this.getAvatar}
    
  }
  onImageNotLoad () {

  }
  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => setTimeout(()=> {this.users = users; this.progressBar = false}, 2000) );
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
  confirm (user : User) {
    this.dialog.open(ConfimationDialog, {      
      data: {id : user.id}
    });
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
  styleUrls: ['./admin-page.component.css']
})
export class EditDeleteDialog implements OnInit {
  constructor(  public dialogRef: MatDialogRef<EditDeleteDialog>, private userService: GetUserService, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    email: string = '';
    password: string = '';
    code: string = '';
    ngOnInit(): void {
      this.email = this.data.name;
      this.password = this.data.password;
      this.code = this.data.code
    }
    loginForm: FormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      code: ['', [Validators.required, Validators.minLength(1)]]
    }) 
    validation: boolean = false
    testOfName: boolean = false
    save (event: any) {
        if (!this.loginForm.valid) {
          this.validation = true          
      return;
        } 
             
      if (!this.data.edit) {
        this.validation = false
        this.testOfName = false
        if (this.userService.testNameOfUser(this.email)) {
          this.testOfName = true
          return
        }         
        let idAdding = 0;
        this.userService.getLastId().subscribe(id => idAdding = id+1);    
        const userAdding = {
          id: idAdding,
          name: this.email,
          password: this.password,
          code: this.code          
        } 
            
        this.userService.addUser(userAdding);
      } else { 
        if (this.userService.testNameOfUser(this.email) && (this.email !== this.data.name)) {          
          this.testOfName = true
          return
        }    
        const userEdiding = {
          id: this.data.id,
          name: this.email,
          password: this.password,
          code: this.code          
        }     
        this.userService.editUser(userEdiding)        
      }
     this.dialogRef.close()
    }
    cancel () {
      this.dialogRef.close()
    }
}

@Component({
  selector: 'confimation-dialog',
  templateUrl: 'confirmation-dialog.html',
  styleUrls: ['./admin-page.component.css']
})
export class ConfimationDialog {
  
constructor (@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogRef2: MatDialogRef<ConfimationDialog>,
private userService: GetUserService) {}
closeDialog () {
  this.dialogRef2.close()
}

delete(): void {  
  this.userService.deleteUser(this.data.id);
  this.dialogRef2.close()
}
}

