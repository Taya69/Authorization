import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { GetUserService } from '../get-user.service'
import {Router} from '@angular/router'


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  id : number = 0;
  hide: boolean = false;

  constructor(private fb: FormBuilder, private userService: GetUserService, private router: Router) {
  }

  ngOnInit() {
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(1)]]
  })
    
  addUser(event: any) {
    if (!this.loginForm.valid) {
      return;
    }
    this.userService.getLastId().subscribe((id) => {
      console.log(id)
      this.id = id+1
    })
        
    this.userService.addUser({
      id: this.id,
      name: event.target[0].value,
      password: event.target[1].value,
      code: ''
    }     
    )    
    this.router.navigate( ['/verification',], 
    {
        queryParams:{
            'mode': 'install',
            'userId': this.id
        },        
    }
    )
   
  }

}

