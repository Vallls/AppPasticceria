import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuarios';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
  ActUser: Observable<string>;

  constructor(private firestoreService: FirestoreService, private router:Router) {
    this.confirmar = false;
    this.firestoreService.getUsers().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
   }

   alerts(){
     alert("email y contrasena no coinciden");
   }

  autentificar(){
    for(var i=0; i<this.usuarios.length; i++){
      if(this.usuarios[i].email == this.users.email && this.usuarios[i].password == this.users.password){
        
        if(this.usuarios[i].admin==true){
          this.ActUser = this.usuarios[i].id;
          this.gotoDetail2(this.usuarios[i].id);
          this.confirmar=true;
          
          
        }else{
          this.ActUser = this.usuarios[i].id;
          
          this.gotoDetail(this.usuarios[i].id);
          this.confirmar=true;
          
      }
    }
    if(this.confirmar==false){
      this.alerts();
    }
  }
}

ActiUser(){
return this.ActUser;

}

  gotoDetail(id){
    this.router.navigate([`/user/`]);
    console.log(this.ActUser);
    
  }
  gotoDetail2(id){
    this.router.navigate([`/admin/`]);
  }

  ngOnInit() {
  }
}

