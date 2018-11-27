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
  

  constructor(private firestoreService: FirestoreService, private router:Router, public fireauth: AuthService ) {
    
    this.usuarios = this.firestoreService.Ausuario;
  }

  login(){ //llama a la funcion del fireauth para iniciar sesion
      this.fireauth.login(this.users.email,this.users.password);
}

  ngOnInit() {
  }
}

