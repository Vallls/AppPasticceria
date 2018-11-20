import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuarios';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import { AuthService } from 'src/app/services/auth/auth.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public payPalConfig?: PayPalConfig;

  private initConfig(): void {
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
        console.log('OnPaymentComplete');
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
          total: this.Total
        }
      }]
    });
  }

  UID;
  usuarios = [];
  IdUsuario;
  carritos = [];
  IdCarrito;
  posicion;
  arrayCarritos = [];
  id;
  productos = [];

  Total: number = 0;
  usuario;
  constructor(private firestoreService: FirestoreService, private route:ActivatedRoute,public fireAuth: AuthService,) { 
    this.UID = this.fireAuth.getUser();
    this.usuarios = firestoreService.Ausuario;
    this.IdUsuario = this.getIDUsuario();
    this.carritos = firestoreService.Acarrito;
    this.posicion = this.getIDCarrito();
    this.arrayCarritos = firestoreService.idCarrito;
    this.id = this.arrayCarritos[this.posicion].id
  }

  getIDUsuario(){
    for(var i=0; i<this.usuarios.length; i++){
      if(this.usuarios[i].id == this.UID)
      {
        return this.usuarios[i].id;
      }
    }
  }

  getIDCarrito(){
    for(var i=0; i<this.carritos.length; i++){
      if(this.carritos[i].id == this.IdUsuario)
      {
        return i;
      }
    }
  }

  total(){
    var numero;
    this.Total = 0;
    for(var i=0; i<this.productos.length; i++){
      numero = Number(this.productos[i].price);
      this.Total = this.Total + numero;
    }
  }

  eliminar(item){
    this.firestoreService.deleteCarrito(this.id,item);
  }

  ngOnInit() {
    this.firestoreService.getProductos(this.id).subscribe(productos =>{
      this.productos = productos;
      this.total()
    });
    this.initConfig();
  }

}
