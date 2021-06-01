import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { GetUserService } from '../get-user.service'
import {Router} from '@angular/router'
import { Users } from 'src/mock-users';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  id : number = 0;
  hide: boolean = true;

  constructor(private fb: FormBuilder, private userService: GetUserService, private router: Router) {
  }

  ngOnInit() {
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(1)]]
  })
    
  addUser(event: any) {
    console.log(Users)
    if (!this.loginForm.valid) {
      return;
    }
    
    // if (this.userService.testNameOfUser(event.target[0].value)) {
    //   alert('this mail occupied')
    //   return
    // }
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

