import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { GetUserService } from '../get-user.service'
import {Router} from '@angular/router'
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  hide: boolean = true;
  email1: string = '';
  password: string = ''
  constructor(private fb: FormBuilder, private userService: GetUserService, private router: Router, public dialog: MatDialog) {
  }
  ngOnInit() {    
  } 
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(1)]]
  }) 
  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }  
    this.userService.findUser(this.email1).subscribe(
      (user)=> {
        if (user === undefined) {          
          this.dialog.open(DialogDataExampleDialog, {
            data: 'login'                   
          });
            return
        } else {
          if (!(this.password === user.password)) { 
            this.dialog.open(DialogDataExampleDialog, {
              data: 'password' 
            });           
            return
          } else {            
            this.router.navigate(['/verification',], 
            {
                queryParams:{
                    'mode': 'confirmation',
                    'userId': user.id,
                },        
            })
          }
        }
      }
    )
  }

}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}