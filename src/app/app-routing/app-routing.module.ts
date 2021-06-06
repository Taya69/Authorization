import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router} from '@angular/router';
import {AuthorizationComponent} from '../authorization/authorization.component';
import {AppComponent} from '../app.component'
import {HomeComponent} from '../home/home.component'
import { RegistrationComponent} from '../registration/registration.component'
import { VerificationComponent} from '../verification/verification.component'
import { RestoreOfPasswordComponent} from '../restore-of-password/restore-of-password.component'
import { AuthGuard } from '../auth.guard';
import { AdminPageComponent } from '../home/admin-page/admin-page.component';
import { PostsComponent } from '../home/posts/posts.component';
import { PostDetailComponent } from '../home/post-detail/post-detail.component';
import { UserOfficeComponent } from '../home/user-office/user-office.component';

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
        path: 'admin',
        component: AdminPageComponent
      },
      {
        path: 'posts',
        component: PostsComponent
      },
      {
        path: 'posts/:id',
        component: PostDetailComponent
      },     
    ]
  },
  {
    path: 'account',
    component: UserOfficeComponent,
    canActivate: [AuthGuard],
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