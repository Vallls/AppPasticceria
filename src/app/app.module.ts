import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';
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
import { MenuComponent } from './component/menu/menu.component';
import { DataComponent } from './component/data/data.component';
import { DatavComponent } from './view/datav/datav.component';
import { CartComponent } from './view/cart/cart.component';
import { MmenuComponent } from './view/mmenu/mmenu.component';
import { IngredientsComponent } from './view/ingredients/ingredients.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CModalComponent } from './c-modal/c-modal.component';

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
    NavbarAdminComponent,
    MenuComponent,
    DataComponent,
    DatavComponent,
    CartComponent,
    MmenuComponent,
    IngredientsComponent,
    CModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
