import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { GetUserService } from '../get-user.service'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-restore-of-password',
  templateUrl: './restore-of-password.component.html',
  styleUrls: ['./restore-of-password.component.css']
})
export class RestoreOfPasswordComponent implements OnInit {
   constructor(private fb: FormBuilder, private route: Router) { }

  ngOnInit(): void {    
  }

  restoreForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
  })
  restore(event: any) {
    if (!this.restoreForm.valid) {
      return;
    }     
    this.route.navigate([''])
  }

}
