import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import * as firebase from 'firebase';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  navbar = new Subject;  
  users: Observable<firebase.User>;
  usuarios = [];
  confirmar: boolean = false;

  constructor(public fireAuth: AngularFireAuth, public router: Router,private firestoreService: FirestoreService,) {
    this.users = fireAuth.authState;
    this.navbar.next('inicio')
    this.usuarios = this.firestoreService.Ausuario;
   }

   alerts(){
    alert("Combinacion de email y contraseña no coinciden");
  }

  login(email:string, password: string){ //funcion login para acceder a la pagina
    for(var i=0; i<this.usuarios.length; i++){
      if(this.usuarios[i].email == email && this.usuarios[i].password == password ){
          this.confirmar == true;
          if(this.usuarios[i].admin == true) {
              return firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
                  this.navbar.next('admin');
                  this.router.navigate(['/admin']);
                })
          }else{
              return firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
                  this.navbar.next('user');
                  this.router.navigate(['/user']);
                })
          }
      }
  }
  if(this.confirmar==false){
      this.alerts();
  }     
}
 

       
   



  signUp(email: string, password: string){ //funcion registrar para crear un usuario
       return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
     
   }

   logOut(){ //funcion cerrar sesion para salir del sistema
     
    this.fireAuth.auth.signOut().then( () => {
      this.navbar.next('inicio');
      this.router.navigate(['/home']);
      
    })
   }

   getUser(){ //obtiene al usuario activo 
     if (this.fireAuth.auth.currentUser == null){
      this.router.navigate(['/login']);
     }
    return this.fireAuth.auth.currentUser.uid;
  }

   RecuperarContrasena(email: any){ //funcion para cambiar la clave del usuario
     this.fireAuth.auth.sendPasswordResetEmail(email).then(() =>{
       alert("Se ha enviado un mensaje a tu correo");
     }).catch( () => {
      alert("Ingresa tu correo en el campo email");
     });
   }


   getNavbar(){
     return this.navbar;
   }
  
}
