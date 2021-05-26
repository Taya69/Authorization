import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { GetUserService } from '../get-user.service'
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  mode : string = '';
  id : number = 0
  constructor(private router : ActivatedRoute, private fb: FormBuilder, private route: Router,
    private userService: GetUserService, private dialog : MatDialog) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe((param) => {this.mode = param.mode, this.id = param.userId})
  }

  verifyForm: FormGroup = this.fb.group({
    email: ['',],
  })
  verify(event: any) {
    if (!this.verifyForm.valid) {
      return;
    }     
    this.userService.findUserById(this.id).subscribe (      
      (user) => {
        if (this.mode === "install"){
          user.code = event.target[0].value
          this.route.navigate(['/home'])
          localStorage.setItem("key", user.name) }
        if (this.mode === "confirmation") {          
          if (user.code === event.target[0].value) {
            this.route.navigate(['/home'])
            localStorage.setItem("key", user.name)  } 
          else {
            this.dialog.open(DialogForVerification)
          }
       }
      }
    )   
  }

}

@Component({
  selector: 'dialog-for-verification',
  templateUrl: 'DialogForVerification.html',
})
export class DialogForVerification {
  constructor() {}
}
