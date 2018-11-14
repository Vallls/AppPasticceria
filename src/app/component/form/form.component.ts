import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuarios';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
 
  usuarios = [];
  users = {} as Usuario;
  usering = {} as Usuario;
  confirmar: boolean;
  

  constructor(private firestoreService: FirestoreService, private router:Router, public fireauth: AuthService ) {
    this.confirmar = false;
    
    this.usuarios = this.firestoreService.Ausuario;
    console.log(this.usuarios);
  }

   alerts(){
     alert("Combinacion de email y contraseña no coinciden");
   }

  autentificar(){
    for(var i=0; i<this.usuarios.length; i++){
      if(this.usuarios[i].email == this.users.email && this.usuarios[i].password == this.users.password){
        this.confirmar=true;
        this.fireauth.Login(this.users.email,this.users.password,this.usuarios[i].admin);
          
        }
    
    }
    if(this.confirmar==false){
      this.alerts();
  }
}

  ngOnInit() {
  }
}

