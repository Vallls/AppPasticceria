import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuarios';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import { AuthService } from 'src/app/services/auth/auth.service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public payPalConfig?: PayPalConfig;

  private initConfig(total): void {
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: 'ASZsahjnb-dRJzOoZAuX6bxGn2e6aM_YQS33HRJxi2s2ppMhBhn-BWSeoZsKTFu68Ozc4W8Sk9WYTTdv',
        production: ''
      },
      button: {
        label: 'paypal',
      },
      onPaymentComplete: (data, actions) => {
        this.addHistorial();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
      },
      onError: (err) => {
        console.log('OnError');
      },
      transactions: [{
        amount: {
          currency: 'USD',
          total:  total
        }
      }]
    });
  }
  closeResult: string;
  UID;
  carritos = [];
  historiales = []
  posicion;
  posicion2;
  arrayCarritos = [];
  arrayHistoriales = [];
  id;
  usuarios = [];
  name: string;
  lastname: string;
  nombrecompleto: string;
  productos = [];
  variable: boolean = false;
  npedido;
  totalalter;
  Total: number = 0;
  usuario;
  historialcorrecto;
  constructor(private firestoreService: FirestoreService, private route:ActivatedRoute,public fireAuth: AuthService,private modalService: NgbModal) { 
    this.UID = this.fireAuth.getUser();
    this.usuarios = firestoreService.Ausuario;
    this.name = this.getName();
    this.lastname = this.getLastname();
    this.nombrecompleto = this.name+" "+this.lastname
    console.log(this.nombrecompleto)
    this.carritos = firestoreService.Acarrito;
    this.historiales = firestoreService.Ahistorial
    this.posicion = this.getIDCarrito();
    this.getIDHistorial();
    this.arrayCarritos = firestoreService.idCarrito;
    this.arrayHistoriales = firestoreService.idHistorial;
    this.id = this.arrayCarritos[this.posicion].id
    this.totalalter =this.Total;
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

  getIDCarrito(){
    for(var i=0; i<this.carritos.length; i++){
      if(this.carritos[i].id == this.UID)
      {
        return i;
      }
    }
  }

  getIDHistorial(){
    for(var i=0; i<this.historiales.length; i++){
      if(this.historiales[i].id == this.UID)
      {
        this.posicion2 = i;
        this.npedido = this.historiales[i].npedido;
        this.historialcorrecto = this.historiales[i]
      }
    }
  }

  total(){
    var numero;
    this.Total = 0;
    for(var i=0; i<this.productos.length; i++){
      numero = Number(this.productos[i].price) + Number(this.productos[i].extra1pr) + Number(this.productos[i].extra2pr);
      this.Total = this.Total + numero;
    }
  }

  sumaextras(){
    var numero
    for(var i=0; i<this.productos.length; i++){
      numero = Number(this.productos[i].price) + Number(this.productos[i].extra1pr) + Number(this.productos[i].extra2pr);
      this.productos[i].priceb = numero
      numero = 0
    }
  }

  extras(){
    var extra:string = ""
    for(var i=0; i<this.productos.length; i++){
      if(this.productos[i].extra1 != "" && this.productos[i].extra2 != ""){
        extra = this.productos[i].extra1+", "+this.productos[i].extra2
        this.productos[i].extras = extra
        extra=""
      }else{
        if(this.productos[i].extra1 != ""){
          extra = this.productos[i].extra1
          this.productos[i].extras = extra
          extra=""
        }else{
          if(this.productos[i].extra2 != ""){
            extra = this.productos[i].extra2
            this.productos[i].extras = extra
            extra=""
          }else{
            this.productos[i].extras = "(Sin extras)"
            extra=""
          }
        }
      }

    }
  }

  alerta(){
    alert("Compra realizada con exito");
  }


  getTotal(){
    return this.Total;
  }

  eliminar(item){
    this.firestoreService.deleteCarrito(this.id,item);
  }

  addHistorial(){
    var id = this.arrayHistoriales[this.posicion2].id
    this.firestoreService.addHistorial(id,this.productos,this.npedido,this.arrayHistoriales[this.posicion2],this.historialcorrecto)
    this.firestoreService.addPedidos(this.productos,this.nombrecompleto,this.Total)
    this.firestoreService.deleteAllCarrito(this.id,this.productos)
  }

  cambio(){
    this.variable = true;
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

  ngOnInit() {
    this.firestoreService.getProductos(this.id).subscribe(productos =>{
      this.productos = productos;
      this.extras()
      this.sumaextras()
      this.total()
      const total = this.getTotal();
      this.initConfig( total );
      console.log(this.productos)
    });
  }

}
