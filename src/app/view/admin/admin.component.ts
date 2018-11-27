import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuarios';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';
import { isNgTemplate } from '@angular/compiler';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  usuario;
  UID;
  name: string;
  lastname: string;
  pedidos = [];
  ordenpedidos = []
  idpedidos = []
  constructor(private firestoreService: FirestoreService, private route:ActivatedRoute,private modalService: NgbModal, private fireAuth: AuthService) {
    this.UID = this.fireAuth.getUser();
    this.firestoreService.getAllUsuarios().subscribe(usuarios =>{
      this.usuarios = usuarios
    })
    this.idpedidos = firestoreService.idpedidos
    this.name = this.getName();
    this.lastname = this.getLastname();
    this.firestoreService.getAllPedidos().subscribe(pedidos =>{
      this.pedidos = pedidos;
      this.pedidos.sort(function(a,b){
        if(a.npedidoadmin > b.npedidoadmin){
          return 1
        }
        if(a.npedidoadmin < b.npedidoadmin){
          return -1
        }
        return 0
      })
      this.ordenarpedidos(this.pedidos);
  })
  console.log(this.ordenpedidos)
  console.log(this.pedidos)
   }

   ordenarpedidos(array){
    for(var i=0; i<array.length; i++){
      if(i == 0){
        var product:string = array[i].name
        this.ordenpedidos.push({price:array[i].price,productos:product,usuario:array[i].usuario,pedido:array[i].npedidoadmin})
        var num = 0
      }else{
        if(array[i].npedidoadmin == this.ordenpedidos[num].pedido){
          this.ordenpedidos.map(function(dato){
            if(array[i].npedidoadmin == dato.pedido){
              product=product+","+array[i].name
              dato.productos = product;
            }
          })
        }else{
          product = array[i].name
          this.ordenpedidos.push({price:array[i].price,productos:product,usuario:array[i].usuario,pedido:array[i].npedidoadmin})
          num++
        }
      }
    }
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

  closeResult: string;
  usuarios = [];
  UsertoEdit;

  CambiarAdmin(item){
    this.UsertoEdit = item
    console.log(this.UsertoEdit)
    if(this.UsertoEdit.admin == true){
      this.UsertoEdit.admin = false
    }else{
      this.UsertoEdit.admin = true
    }
    console.log(this.UsertoEdit)
    this.firestoreService.updateUsers(this.UsertoEdit)
  }

  // delete(item){
  //   var variable = this.ordenpedidos.indexOf(item);
  //   console.log(variable)
  //   var variable2 = this.idpedidos[variable];
  //   console.log(variable2)
  //   this.firestoreService.deletePedido(variable2)
  // }

  
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

  ngOnInit() {
}

}
