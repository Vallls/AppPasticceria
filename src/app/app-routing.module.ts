import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation/navigation.component';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { UserComponent } from './view/user/user.component';
import { DatavComponent } from './view/datav/datav.component';
import { AdminComponent } from './view/admin/admin.component';
import { CartComponent } from './view/cart/cart.component';
import { MmenuComponent } from './view/mmenu/mmenu.component';
import { IngredientsComponent } from './view/ingredients/ingredients.component';
import { NavbarUserComponent } from './component/navbar-user/navbar-user.component';
import { FormComponent } from './component/form/form.component';
import { SignupComponent } from './view/signup/signup.component';



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
      {path: '', component: FormComponent},
      
    ],
    component: LoginComponent
  },

  {
    path:'signup',
    children: [
      {path: '', component: SignupComponent},
    ],
    component: SignupComponent
  },
{
  path:'user',
    children: [
      
    {path:'navbar-user', component: NavbarUserComponent}
      
    ],
    component: UserComponent
  },

  {
    path:'admin',
      children: [
        
      ],
      component: AdminComponent
    },
    {
      path:'cart',
        children: [
          
        ],
        component: CartComponent
      },
    {
      path:'mmenu',
         children: [
            
        ],
          component: MmenuComponent
    },
    {
      path:'ingredients',
        children: [
          
        ],
        component: IngredientsComponent
      },       

  {
    path:'datav',
      children: [
        
      ],
      component: DatavComponent
    },

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes),TooltipModule.forRoot(),ModalModule.forRoot()],
  exports: [RouterModule]
})

export class AppRoutingModule { }