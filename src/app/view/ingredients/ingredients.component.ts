import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/usuarios';
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


  pan = [];
  croissant = [];
  pastelito = [];
  dulce = [];
  torta = [];

  Menu = {} as Menu;

  datos;

  opcionSeleccionado: string  = "Selecciona una opción";
  verSeleccion: string        = '';
 
 
  constructor(private firestoreService: FirestoreService, private afStorage: AngularFireStorage) { 

    this.datos = ["Panes", "Croissants", "Pastelitos", "Tortas", "Dulces"];

    this.firestoreService.getPan().subscribe(pan => {
      this.pan = pan;
    });

    this.firestoreService.getCroissant().subscribe(croissant => {
      this.croissant = this.croissant;
    });

    this.firestoreService.getPastelito().subscribe(pastelito => {
      this.pastelito = pastelito;
    });

    this.firestoreService.getTorta().subscribe(torta => {
      this.torta = torta;
    });

    this.firestoreService.getDulce().subscribe(dulce => {
      this.dulce = dulce;
    });
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

  alerts(){
    if(this.Menu.name == null || this.Menu.price == null || this.Menu.description == null || this.verSeleccion == "Selecciona una opción"){
      alert("Complete todos los campos");
    }  else if(this.Menu.name != null && this.Menu.price != null && this.Menu.description != null && this.verSeleccion != "Selecciona una opción"){
      alert("Menu agregado satisfactoriamente");
    }
  }

  addMenu(){
    this.alerts();
    if(this.Menu.name != null && this.Menu.price != null && this.Menu.description != null && this.verSeleccion != "Selecciona una opción") {
      this.Menu.avaible=true;
    if(this.verSeleccion == "Panes"){
      this.firestoreService.addPan(this.Menu);
      this.Menu = {} as Menu;
    }else if(this.verSeleccion == "Croissants"){
      this.firestoreService.addCroissant(this.Menu);
      this.Menu = {} as Menu;
    }else if(this.verSeleccion == "Pastelitos"){
      this.firestoreService.addPastelito(this.Menu);
      this.Menu = {} as Menu;
    }else if(this.verSeleccion == "Tortas"){
      this.firestoreService.addTorta(this.Menu);
      this.Menu = {} as Menu;
    }else if(this.verSeleccion == "Dulces"){
      this.firestoreService.addDulce(this.Menu);
      this.Menu = {} as Menu;
    }
    }
    
  }

  ngOnInit() {
  }

  

  
}
