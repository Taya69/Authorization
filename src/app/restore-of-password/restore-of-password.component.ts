import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { GetUserService } from '../get-user.service'
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-restore-of-password',
  templateUrl: './restore-of-password.component.html',
  styleUrls: ['./restore-of-password.component.css']
})
export class RestoreOfPasswordComponent implements OnInit {
  email: string = ''
   constructor(private fb: FormBuilder, private route: Router, private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {    
  }

  restoreForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  })
  restore(event: any) {
    if (!this.restoreForm.valid) {
      return;
    } 
    this.openBottomSheet() 
    setTimeout(()=> {this.route.navigate([''])}, 1000)       
  }
  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
}

@Component({
  selector: 'app-restore-of-password',
  templateUrl: 'bottom-sheet-overview-example-sheet.html',
})
export class BottomSheetOverviewExampleSheet implements OnInit {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}
  ngOnInit(): void {
    setTimeout(()=> {this._bottomSheetRef.dismiss()}, 1000)
  }
  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
