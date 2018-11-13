import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario, Menu } from 'src/app/models/usuarios';
import { AuthService } from 'src/app/services/auth/auth.service'


@Component({
  selector: 'app-form-signup',
  templateUrl: './form-signup.component.html',
  styleUrls: ['./form-signup.component.css']
})
export class FormSignupComponent implements OnInit {

 usuarios = [];
 users = {} as Usuario;
 


  constructor(private firestoreService: FirestoreService, private fireAuth: AuthService) { 
    this.users.admin = false;
    this.firestoreService.getUsers().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  ngOnInit() {
    
  }
  
alerts(){
  if(this.users.name == null || this.users.lastname == null || this.users.email == null || this.users.password == null){
    alert("Complete todos los campos");
  }  else if(this.users.name != null && this.users.lastname != null && this.users.email != null && this.users.password != null && this.users.password == this.users.passwordc){
    alert("Registro completado satisfactoriamente");
  }else if(this.users.password !== this.users.passwordc){
    alert("Las contraseñas no coinciden");
  }
}
addUser(){
  this.alerts();
  if(this.users.name != null && this.users.lastname != null && this.users.email != null && this.users.password != null && this.users.password == this.users.passwordc) {
    this.fireAuth.register(this.users.email, this.users.password);
    this.users.admin = false;
    this.users.carrito = [];
    this.firestoreService.addUsers(this.users);
    this.users = {} as Usuario;
  }
  
}

}


