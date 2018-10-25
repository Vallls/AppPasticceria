import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuarios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  usuarios = [];
  users = {} as Usuario;
  usering = {} as Usuario;
  confirmar;

  constructor(private firestoreService: FirestoreService, private router:Router) {
    this.confirmar = false;
    this.firestoreService.getUsers().subscribe(usuarios => {
      this.usuarios = usuarios;
      console.log(this.usuarios);
    });
   }

   alerts(){
     alert("email y contrasena no coinciden");
   }

  autentificar(){
    for(var i=0; i<this.usuarios.length; i++){
      if(this.usuarios[i].email == this.users.email && this.usuarios[i].password == this.users.password){
        
        this.users = {} as Usuario;
        this.confirmar = true;
        if(this.usuarios[i].admin==true){
          this.gotoDetail2(this.usuarios[i].id);
        }else{
          this.gotoDetail(this.usuarios[i].id);
        }
        
        this.usering = this.usuarios[i];
      }
    }
    if(this.confirmar==false){
      this.alerts();
    }
  }

  gotoDetail(id){
    this.router.navigate([`/user/${id}`]);
  }
  gotoDetail2(id){
    this.router.navigate([`/admin/${id}`]);
  }

  ngOnInit() {
  }
}
