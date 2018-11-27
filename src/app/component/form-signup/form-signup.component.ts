import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario, Carrito, Historial } from 'src/app/models/usuarios';
import { AuthService } from 'src/app/services/auth/auth.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-signup',
  templateUrl: './form-signup.component.html',
  styleUrls: ['./form-signup.component.css']
})
export class FormSignupComponent implements OnInit {

 usuarios = [];
 users = {} as Usuario;
 carrito = {} as Carrito;
 historial = {} as Historial


  constructor(private firestoreService: FirestoreService, public fireAuth: AuthService, private router:Router) { 
    this.users.admin = false;
    this.firestoreService.getUsers().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  ngOnInit() {
    
  }
  
alerts(){ //Funcion que indica las alertas dependiendo sea el caso del error
  
   
    if(this.users.name == null || this.users.lastname == null || this.users.email == null || this.users.password == null){
      alert("Complete todos los campos");
      
    }  else if(this.users.name != null && this.users.lastname != null && this.users.email != null && this.users.password != null && this.users.password == this.users.passwordc){
      alert("Registro completado satisfactoriamente");
      
    }else if(this.users.password !== this.users.passwordc){
      alert("Las contraseñas no coinciden");  
      
    }else if(this.users.password.length < 6){
      alert("Las contraseñas debe tener minimo 6 caracteres");
      
    }
  
}

addUser(){ //Funcion que agrega al usuario al FireAuth y a la coleccion usuario.
  this.alerts();
  if(this.users.name != null && this.users.lastname != null && this.users.email != null && this.users.password != null && this.users.password == this.users.passwordc && this.users.password.length >= 6)  { //comprueba si todos los campos estan llenos y la contrasena tiene mas de 6 caracteres
    this.fireAuth.signUp(this.users.email, this.users.password) //funcion de auth que registra un usuario
    .then( data => {
      const userID = data.user.uid;
      const user = {
        name: this.users.name,
        lastname: this.users.lastname,
        email: this.users.email,
        password: this.users.password,
        admin: false,
        id: userID,
      } as Usuario
      this.crearCarrito(userID);
      this.crearHistorial(userID);
      this.firestoreService.addUsers(user, userID) //funcion de firestore que agrega a la coleccion usuario
      .then( ()=> {
        this.fireAuth.navbar.next('user')
        this.router.navigate(['/user']);
        // this.users = {} as Usuario;
      })
      .catch( err => {
        alert(err.message)
      })
    })
    .catch( err => {
      alert('Error de Auth,' + err.message);
    })
   
  }
  
}

crearCarrito(userID){ //funcion que crea un documento carrito al crear un usuario
  this.carrito = {
    id: userID,
  } as Carrito
  this.firestoreService.CrearCarrito(this.carrito).then( ()=> {
    this.carrito = {} as Carrito;

  })
}

crearHistorial(userID){ //funcion que crea un documento historial al crear un usuario
  this.historial = {
    id: userID,
    npedido: 1,
  } as Historial
  this.firestoreService.CrearHistorial(this.historial).then( ()=> {
    this.historial = {} as Historial;

  })
}

}


