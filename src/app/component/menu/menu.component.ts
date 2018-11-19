import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Menu, Carrito } from 'src/app/models/usuarios';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  closeResult: string;
  menu = [];
  idmenu = [];
  product: Menu;
  var;
  variable;
  cart: Carrito;

  opcionSeleccionado2: string  = "Selecciona una opción";
  opcionSeleccionado3: string  = "Selecciona una opción";
  verSeleccion2: string        = '';
  verSeleccion3: string        = '';


  constructor(private modalService: NgbModal, private firestoreService: FirestoreService,) {
    this.menu = firestoreService.Amenu;
    this.idmenu = firestoreService.idMenu;
   
  }

  encontrar(item){
    this.var = this.menu.indexOf(item);
    this.variable = this.idmenu[this.var];
    console.log(this.variable);
    console.log(this.getSmenu());
    console.log(this.getSmenu().extra2);
  }

  

  guardar(item){
    this.product = item;
  }

  getSmenu(){
    return this.menu[this.var];
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  capturar2() {

    this.verSeleccion2 = this.opcionSeleccionado2;
  }

  capturar3() {

    this.verSeleccion3 = this.opcionSeleccionado3;
  }

  ngOnInit() {
  }

}
