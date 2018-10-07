import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation/navigation.component';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { SignupComponent } from './view/signup/signup.component';
import { UserComponent } from './view/user/user.component';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
    ],
    component: NavigationComponent
  },

  {
    path: 'login',
    children: [
      
    ],
    component: LoginComponent
  },

  {
    path:'signup',
    children: [
      
    ],
    component: SignupComponent
  }
{
  path:'user',
    children: [
      
    ],
    component: UserComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }