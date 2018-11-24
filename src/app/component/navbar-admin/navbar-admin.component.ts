import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  UID;
  usuarios = [];
  name: string;
  lastname: string;
  
  constructor(public fireAuth: AuthService, public firestoreService: FirestoreService,public router: Router) { 
    this.UID = this.fireAuth.getUser();
    if(this.UID == null){
      this.router.navigate(['/login']);
    }
    console.log(this.UID);
    this.usuarios = firestoreService.Ausuario;
    this.name = this.getName();
    this.lastname = this.getLastname();
  }

  getName(){
    for(var i=0; i<this.usuarios.length; i++){
      if(this.usuarios[i].id == this.UID)
      {
        return this.usuarios[i].name;
      }
    }
  }

  getLastname(){
    for(var i=0; i<this.usuarios.length; i++){
      if(this.usuarios[i].id == this.UID)
      {
        return this.usuarios[i].lastname;
      }
    }
  }
  
  ngOnInit() {
  }

}
