import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  navbar = new Subject;  
  users: Observable<firebase.User>;

  constructor(public fireAuth: AngularFireAuth, public router: Router) {
    this.users = fireAuth.authState;
    this.navbar.next('inicio')
   }

  Login(email:string, password: string, admin: boolean){
    if(admin == true){
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.navbar.next('admin');
      this.router.navigate(['/admin']);
      
    });
    }else if(admin == false){
      
      return this.fireAuth.auth.signInWithEmailAndPassword(email, password).then(() =>{
        this.navbar.next('user');
        this.router.navigate(['/user']);
        
      });
    }

  
   }

  SignUp(email: string, password: string){
       return this.fireAuth.auth.createUserWithEmailAndPassword(email, password).then(() =>{
        this.navbar.next('user')
        this.router.navigate(['/user']);
        
      });
     
   }

   LogOut(){
     
    this.fireAuth.auth.signOut().then( () => {
      this.navbar.next('inicio');
      this.router.navigate(['/home']);
      
    })
   }

   getUser(){
    return this.fireAuth.auth.currentUser.uid;
  }

   RecuperarContrasena(email: any){
     this.fireAuth.auth.sendPasswordResetEmail(email);
   }


   getNavbar(){
     return this.navbar;
   }
  
}
