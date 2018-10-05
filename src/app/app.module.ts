import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
