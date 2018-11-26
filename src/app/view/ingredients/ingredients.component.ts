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
    this.extratype = ["dulce", "salado"];
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
      this.Menu.typeE=this.verSeleccion3;

      this.firestoreService.addMenu(this.Menu).then(() => {
        this.Menu = {} as Menu;
        alert("Menu agregado satisfactoriamente");
      }).catch(() => {
        alert("no se agrego");
      });
      
    }else{alert("Complete todos los campos");} 
  }

  
 
  ngOnInit() {
    this.firestoreService.getAllMenu().subscribe(menus =>{
      this.menu = menus;
    })

    this.firestoreService.getAllMenu().subscribe(extra =>{
      this.extras = extra;
    })
  }
  };

  


  

  
}
