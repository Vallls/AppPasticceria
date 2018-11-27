import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Menu, Carrito } from 'src/app/models/usuarios';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { AuthService } from 'src/app/services/auth/auth.service'
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  closeResult: string;
  menu = [];
  idmenu = [];
  extra = [];
  product: Menu;
  var;
  variable;
  var2;
  variable2;
  cart: Carrito;
  dulce= [];
  salado = [];

  opcionSeleccionado2: string  = "Selecciona una opción";
  opcionSeleccionado3: string  = "Selecciona una opción";
  verSeleccion2: string        = '';
  verSeleccion3: string        = '';

  
  usuarios = [];
  IdUsuario;
  carritos = [];
  IdCarrito;
  posicion;
  arrayCarritos = [];
  productos = []
  id;
  arrayHistorial = []
  posicion2;
  historiales = []

  busqueda: string
  arraybusqueda = [{name: "hola"}];
  buscando: boolean = false

  constructor(private modalService: NgbModal, private firestoreService: FirestoreService,public fireAuth: AuthService,private cdRef:ChangeDetectorRef) {
    this.idmenu = firestoreService.idMenu;
    this.IdUsuario = this.fireAuth.getUser();
    this.carritos = firestoreService.Acarrito;
    this.historiales = firestoreService.Ahistorial
    this.posicion = this.getIDCarrito();
    this.getIDHistorial();
    this.arrayCarritos = firestoreService.idCarrito;
    this.arrayHistorial = firestoreService.idHistorial;
    this.id = this.arrayHistorial[this.posicion2].id
    this.extra = this.firestoreService.Aextra;
    console.log(this.arraybusqueda)
  }

  encontrar(item){ //Guarda el id del menu seleccionado
    this.var = this.menu.indexOf(item);
    this.variable = this.idmenu[this.var];
  }

  getIDCarrito(){ //Guarda el id del carrito seleccionado
    for(var i=0; i<this.carritos.length; i++){
      if(this.carritos[i].id == this.IdUsuario)
      {
        return i;
      }
    }
  }

  getIDHistorial(){ //Guarda el id del historial seleccionado
    for(var i=0; i<this.historiales.length; i++){
      if(this.historiales[i].id == this.IdUsuario)
      {
        this.posicion2 = i;
      }
    }
  }

  addCarrito(menu){ //anade el menu seleccionado al carrito
    var id = this.arrayCarritos[this.posicion].id
    if(this.getExtra1()!="none" && this.getExtra2() != "none"){
      menu.extra1 = this.getExtra1().name;
      menu.extra1pr =  this.getExtra1().price;
      menu.extra2 = this.getExtra2().name;
      menu.extra2pr =  this.getExtra2().price;
    }else{
      if(this.getExtra1()!="none"){
        menu.extra1 = this.getExtra1().name;
        menu.extra1pr =  this.getExtra1().price;
        menu.extra2 = ""
        menu.extra2pr = 0
       }
       if(this.getExtra2()!="none"){
        menu.extra2 = this.getExtra2().name;
        menu.extra2pr =  this.getExtra2().price;
        menu.extra1 = ""
        menu.extra1pr = 0
        }
        if(this.getExtra1()=="none" && this.getExtra2()=="none"){
          menu.extra2 = ""
          menu.extra2pr = 0
          menu.extra1 = ""
          menu.extra1pr = 0
        }
    }
    this.firestoreService.addCarrito(menu,id)
  }

  verificard(producto){ //verifica si al realizar la recompra, los productos estan disponibles
    for(var i=0; i<this.menu.length; i++){
      if(this.menu[i].name == producto.name){
        if(this.menu[i].available == true){
          return this.addCarrito(producto)
        }else{
          return alert('El menu no se encuentra disponible actualmente');
        }
      }
    }
    return alert('El menu no se encuentra en existencia');
  }

  guardar(item){  
    this.product = item;
  }

  getSmenu(){ //obtiene el valor del id seleccionado
    return this.menu[this.var];
  }

  getDulce(){ //obtiene todos los extra de tipo dulce
    var k=0;
    for(var i=0; i<this.extra.length; i++){
      if(this.extra[i].type == 'dulce'){
        this.dulce[k] = this.extra[i];
        k++;
      }
    }
    return this.dulce;
  }

  getSalado(){ //obtiene todos los extra de tipo salado
    var k=0;
    for(var i=0; i<this.extra.length; i++){
      if(this.extra[i].type == 'salado'){
        this.salado[k] = this.extra[i];
        k++;
      }
    }
    return this.salado;
  }

  getExtra1(){ //obtiene todos los datos del extra 1 seleccionado
    for(var i=0; i<this.extra.length; i++){
      if(this.verSeleccion2 == this.extra[i].name){
        return this.extra[i];
      }
    }
    return "none";
  }

  getExtra2(){ //obtiene todos los datos del extra2 seleccionado
    for(var i=0; i<this.extra.length; i++){
      if(this.verSeleccion3 == this.extra[i].name){
        return this.extra[i];
      }
    }
    return "none";
  }

  buscar(){
    var query = this.busqueda
    console.log(query)
    if(query != undefined){
      return this.menu.filter(function(el) {
        return el.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
    }
  }

  definir(){
    if(this.busqueda != ''){
      this.buscando = true
    }else{
      this.buscando = false
    }
    console.log(this.busqueda)
    this.arraybusqueda = this.buscar()
    console.log(this.arraybusqueda)
    // Array.observe(this.arraybusqueda, function(changes) {
    //   console.log(changes);
    // });
  }

  open(content) { //funcion para abrir el modal
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

  capturar2() { //captura la opcion seleccionada en el select

    this.verSeleccion2 = this.opcionSeleccionado2;
  }

  capturar3() {

    this.verSeleccion3 = this.opcionSeleccionado3;
  }

  ngOnInit() {
    this.firestoreService.getAllMenu().subscribe(menus =>{
      this.menu = menus;
    })
    this.firestoreService.getPHistorial(this.id).subscribe(productos =>{
      this.productos = productos;
      this.productos.sort(function(a,b){
        if(a.npedido > b.npedido){
          return 1
        }
        if(a.npedido < b.npedido){
          return -1
        }
        return 0
      })
    })
    
    
  }

}

