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
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['/admin']);
    });
    }else if(admin == false){
      
      return this.fireAuth.auth.signInWithEmailAndPassword(email, password).then(() =>{
        this.router.navigate(['/user']);
      });
    }

  
   }

  SignUp(email: string, password: string){
       return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
     
   }

   LogOut(){
     
    this.fireAuth.auth.signOut().then( () => {
      this.router.navigate(['/home']);
    })
   }

   getUser(){
    return this.fireAuth.auth.currentUser.uid;
  }

   RecuperarContrasena(email: any){
     this.fireAuth.auth.sendPasswordResetEmail(email);
   }


  
}
