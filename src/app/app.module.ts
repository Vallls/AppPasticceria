import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { NavigationComponent } from './navigation/navigation/navigation.component';
import { HomeComponent } from './view/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LoginComponent } from './view/login/login.component';
import { NavigationLoginComponent } from './navigation/navigation-login/navigation-login.component';
import { FormComponent } from './component/form/form.component';
import { FormSignupComponent } from './component/form-signup/form-signup.component';
import { SignupComponent } from './view/signup/signup.component';
import { UserComponent } from './view/user/user.component';
import { AdminComponent } from './view/admin/admin.component';
import { NavbarUserComponent } from './component/navbar-user/navbar-user.component';
import { NavbarAdminComponent } from './component/navbar-admin/navbar-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    NavigationLoginComponent,
    FormComponent,
    FormSignupComponent,
    SignupComponent,
    UserComponent,
    AdminComponent,
    NavbarUserComponent,
    NavbarAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
