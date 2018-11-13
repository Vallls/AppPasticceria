import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  navbar = '';
  users: Observable<firebase.User>;

  constructor(public fireAuth: AngularFireAuth, public router: Router) {
    this.users = fireAuth.authState;
    
   }

  Login(email:string, password: string, admin: boolean){
    if(admin == true){
    this.router.navigate(['/admin']);
    this.navbar = "admin";
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
    }else if(admin == false){
      this.router.navigate(['/user']);
      this.navbar = "user";
      return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
    }

  
   }

  SignUp(email: string, password: string){
       return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
     
   }

   LogOut(){
     
    this.fireAuth.auth.signOut();
    this.router.navigate(['/home']);
    
   }

   getUser(){
    var user = this.fireAuth.auth.currentUser;
    var uid;

if (user != null) {
  
  return uid = user.uid; 
}
   }

   RecuperarContrasena(email: any){
     this.fireAuth.auth.sendPasswordResetEmail(email);
   }


  
}
