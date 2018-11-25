import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  usuarios = [];
  users = {} as Usuario;
  usering = {} as Usuario;
  
  constructor(private firestoreService: FirestoreService, private router:Router, public fireauth: AuthService) {
    this.usuarios = this.firestoreService.Ausuario;
   }

   cambio(){
    this.fireauth.RecuperarContrasena(this.users.email);
    }
   

  ngOnInit() {
  }

}
