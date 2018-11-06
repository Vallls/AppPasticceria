import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/usuarios';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
 
  pan = [];
  croissant = [];
  pastelito = [];
  dulce = [];
  torta = [];

  Menu = {} as Menu;

  datos;

  opcionSeleccionado: string  = '0'; // Iniciamos
  verSeleccion: string        = '';
 
 
  constructor(private firestoreService: FirestoreService,) { 

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
    if(this.verSeleccion = "Panes"){
      this.firestoreService.addPan(this.Menu);
    }else if(this.verSeleccion = "Croissants"){
      this.firestoreService.addCroissant(this.Menu);
    }else if(this.verSeleccion = "Pastelitos"){
      this.firestoreService.addPastelito(this.Menu);
    }else if(this.verSeleccion = "Tortas"){
      this.firestoreService.addTorta(this.Menu);
    }else if(this.verSeleccion = "Dulces"){
      this.firestoreService.addDulce(this.Menu);
    }
    }
    this.Menu = {} as Menu;
  }

  ngOnInit() {
  }

  

  
}
