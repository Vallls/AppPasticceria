import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
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
        return this.usuarios[i].name;
      }
    }
  }
  ngOnInit() {
  }

}
