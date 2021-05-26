import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, NavigationStart, NavigationEnd } from '@angular/router';
import {AuthorizationComponent} from '../authorization/authorization.component';
import {AppComponent} from '../app.component'
import {HomeComponent} from '../home/home.component'
import { RegistrationComponent} from '../registration/registration.component'
import { VerificationComponent} from '../verification/verification.component'
import { RestoreOfPasswordComponent} from '../restore-of-password/restore-of-password.component'
import { filter, find} from 'rxjs/operators'
import { AuthGuard } from '../auth.guard';

const routes: Routes = [  
  {
    path: '',    
    component: AppComponent,        
    children: [
      {
        path: '',
        component: AuthorizationComponent,        
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'verification',
        component: VerificationComponent
      },
      {
        path: 'restorepassword',
        component: RestoreOfPasswordComponent
      }
    ]
  },
  {
    path: 'home',
    component: HomeComponent,    
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AuthorizationComponent
      }
    ]
  }
];

@NgModule({  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor (public router : Router) {      
    // router.events.pipe(find(e => e instanceof NavigationEnd)).subscribe((e) => { 
           
    //   console.log(e) 
    // })  
}
 }