import { Component, OnInit } from '@angular/core';
import { Menu, Extra } from 'src/app/models/usuarios';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  uploadState: Observable<string>;
  downloadURL: Observable<string>;


  menu = [];
  Menu = {} as Menu;
  extras = [];
  Extra = {} as Extra;
  extrass;
  extratype;
  datos;

  opcionSeleccionado: string  = "Selecciona una opción";
  opcionSeleccionado2: string  = "Selecciona una opción";
  opcionSeleccionado3: string  = "Selecciona una opción";
  opcionSeleccionado4: string  = "Selecciona una opción";
  verSeleccion: string        = '';
  verSeleccion2: string        = '';
  verSeleccion3: string        = '';
  verSeleccion4: string        = '';
 
 
  constructor(private firestoreService: FirestoreService, private afStorage: AngularFireStorage) { 

    this.datos = ["Panes", "Croissants", "Pastelitos", "Tortas", "Dulces"];
    this.extrass = ["Chocolate", "Azucar", "Jamon", "Queso", "Carne", "Pollo"];
    this.extratype = ["chocolate", "azucar", "jamon", "queso", "carne", "carneblanca"];
    this.extras = firestoreService.Aextra;
    console.log(this.firestoreService.getQueso());
  }

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL(); 
      })
    ).subscribe();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          this.Menu.img = url;
          
        });
      })
    ).subscribe();
  }
  
  

  capturar() {

    this.verSeleccion = this.opcionSeleccionado;
  }

  capturar2() {

    this.verSeleccion2 = this.opcionSeleccionado2;
  }

  capturar3() {

    this.verSeleccion3 = this.opcionSeleccionado3;
  }
  capturar4() {

    this.verSeleccion4 = this.opcionSeleccionado4;
  }

  AnadirExtra(){
    
    if(this.verSeleccion2 == "Chocolate"){
        this.Menu.extra1 = this.firestoreService.getChocolate();
    }else if(this.verSeleccion2 == "Azucar"){
        this.Menu.extra1 = this.firestoreService.getAzucar();
    }else if(this.verSeleccion2 == "Queso" ){
        this.Menu.extra1 = this.firestoreService.getQueso();
    }else if(this.verSeleccion2 == "Jamon"){
        this.Menu.extra1 = this.firestoreService.getJamon();
    }else if(this.verSeleccion2 == "Carne"){
        this.Menu.extra1 = this.firestoreService.getCarne();
    }else if(this.verSeleccion2 == "Pollo"){
        this.Menu.extra1 = this.firestoreService.getPollo();
    }else if(this.verSeleccion2 == "Selecciona una opción"){
      this.Menu.extra1 = null;
    }
    
    if(this.verSeleccion3 == "Chocolate"){
        this.Menu.extra2 = this.firestoreService.getChocolate();
    }else if(this.verSeleccion3 == "Azucar"){
        this.Menu.extra2 = this.firestoreService.getAzucar();
    }else if(this.verSeleccion3 == "Queso"){
        this.Menu.extra2 = this.firestoreService.getQueso();
    }else if(this.verSeleccion3 == "Jamon"){
        this.Menu.extra2 = this.firestoreService.getJamon();
    }else if(this.verSeleccion3 == "Carne"){
        this.Menu.extra2 = this.firestoreService.getCarne();
    }else if(this.verSeleccion3 == "Pollo"){
        this.Menu.extra2 = this.firestoreService.getPollo();
    }else if(this.verSeleccion3 == "Selecciona una opción"){
      this.Menu.extra2 = null;
    }
  }

  addExtra(){
    if(this.Extra.name!= null && this.Extra.price != null && this.verSeleccion4 != "Selecciona una opción"){
      this.Extra.type = this.verSeleccion4;
      this.firestoreService.addExtra(this.Extra).then(() => {
        this.Extra = {} as Extra;
        alert("Extra agregado satisfactoriamente");
      }).catch(() => {
        alert("no se agrego");
      });
    }else{alert("Complete todos los campos");} 
  }

  addMenu(){
    
    if(this.Menu.name != null && this.Menu.price != null && this.Menu.description != null && this.verSeleccion != "Selecciona una opción") {
      this.Menu.available=true;
      this.Menu.type=this.verSeleccion;
      this.AnadirExtra();

      this.firestoreService.addMenu(this.Menu).then(() => {
        this.Menu = {} as Menu;
        alert("Menu agregado satisfactoriamente");
      }).catch(() => {
        alert("no se agrego");
      });
      
    }else{alert("Complete todos los campos");} 
  }

  ActualizarExtra(){
    for(var i=0; i<this.menu.length; i++){
      if(this.menu[i].extra1.type == "chocolate"){
        this.menu[i].extra1 = this.firestoreService.getChocolate();
        console.log(this.menu[i].extra1.type);
      }else if(this.menu[i].extra1.type == "azucar"){
        this.menu[i].extra1 = this.firestoreService.getAzucar();
      }else if(this.menu[i].extra1.type == "queso"){
        this.menu[i].extra1 = this.firestoreService.getQueso();
      }else if(this.menu[i].extra1.type == "jamon"){
        this.menu[i].extra1 = this.firestoreService.getJamon();
      }else if(this.menu[i].extra1.type == "carne"){
        this.menu[i].extra1 = this.firestoreService.getCarne();
      }else if(this.menu[i].extra1.type == "carneblanca"){
        this.menu[i].extra1 = this.firestoreService.getPollo();
      }

      if(this.menu[i].extra2.type == "chocolate"){
        this.menu[i].extra2 = this.firestoreService.getChocolate();
      }else if(this.menu[i].extra2.type == "azucar"){
        this.menu[i].extra2 = this.firestoreService.getAzucar();
      }else if(this.menu[i].extra2.type == "queso"){
        this.menu[i].extra2 = this.firestoreService.getQueso();
      }else if(this.menu[i].extra2.type == "jamon"){
        this.menu[i].extra2 = this.firestoreService.getJamon();
      }else if(this.menu[i].extra2.type == "carne"){
        this.menu[i].extra2 = this.firestoreService.getCarne();
      }else if(this.menu[i].extra2.type == "carneblanca"){
        this.menu[i].extra2 = this.firestoreService.getPollo();
      }
    }
  }

 
  ngOnInit() {
    this.firestoreService.getAllMenu().subscribe(menus =>{
      this.menu = menus;
    })
  }

  

  
}
