import { Component, OnInit, Input, Output } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios';
import {FormComponent } from 'src/app/component/form/form.component';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service'
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css'],

})
export class NavbarUserComponent implements OnInit {
  
  UID;
  usuarios = [];
  name: string;
  
  

  constructor(public fireAuth: AuthService, public firestoreService: FirestoreService) {
    this.UID = this.fireAuth.getUser();
    console.log(this.UID);
    this.firestoreService.getUsers().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
    this.name = this.getUser();
    console.log(this.name);
  }

  getUser(){
    for(var i=0; i<this.usuarios.length; i++){
      if(this.usuarios[i].id == this.UID)
      {
        return this.usuarios[i].id;
      }
    }
  }



  ngOnInit() {
    
  }
}


