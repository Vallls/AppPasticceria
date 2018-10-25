import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuarios';


@Component({
  selector: 'app-form-signup',
  templateUrl: './form-signup.component.html',
  styleUrls: ['./form-signup.component.css']
})
export class FormSignupComponent implements OnInit {

 usuarios = [];
 users = {} as Usuario;


  constructor(private firestoreService: FirestoreService,) { 
    this.firestoreService.getUsers().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  ngOnInit() {
    
  }
  
addUser(){
  if(this.users.name !== '' && this.users.lastname !== '' && this.users.email !== '' && this.users.password !== '' && this.users.password === this.users.passwordc) {
    this.firestoreService.addUsers(this.users);
  }
}
  
   
}


