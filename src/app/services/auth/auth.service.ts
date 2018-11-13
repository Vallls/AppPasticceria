import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;

  constructor(private fireAuth: AngularFireAuth, private router: Router) {
    this.user = fireAuth.authState;
    
   }

  login(email:string, password: string){
       return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
     
   }

  register(email: string, password: string){
       return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
     
   }

   logout(){
     this.router.navigate(['/home']);
     return this.fireAuth.auth.signOut;
   }

   getuser(){
     return this.user;
   }

  
}
