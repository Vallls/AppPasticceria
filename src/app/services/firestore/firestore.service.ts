import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario, Menu, Carrito, Extra } from 'src/app/models/usuarios';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  
  usuariosCollection: AngularFirestoreCollection;
  usuarios: Observable<Usuario[]>;
  usuariosDoc: AngularFirestoreDocument;
  Ausuario = [];
  

  menuCollection: AngularFirestoreCollection;
  Menu: Observable<Menu[]>;
  MenuDoc: AngularFirestoreDocument;
  Amenu = [];
  idMenu = [];

  extraCollection: AngularFirestoreCollection;
  Aextra = [];
  Cextras = [];
  Aextras = [];
  Qextras = [];
  Jextras = [];
  Caextras = [];
  Pextras = [];

  carritoCollection: AngularFirestoreCollection;
  Acarrito = [];
  idCarrito = [];
  ProductosCollection: AngularFirestoreCollection;
  productos: Observable<Carrito[]>;


  constructor(public db: AngularFirestore,) {
  this.getUsers().subscribe(data => {
    data.forEach(element => {
      this.Ausuario.push(element.payload.doc.data())
    });
  });

    this.getAllMenu().subscribe(data => {
    data.forEach(element => {
     this.Amenu.push(element.payload.doc.data())
     });; 
  });

  this.getAllMenuID().subscribe(data => {
    data.forEach(element => {
     this.idMenu.push(element.payload.doc.ref)
     });; 
  });

  this.getExtra().subscribe(data => {
    data.forEach(element => {
     this.Aextra.push(element.payload.doc.data())
     });; 
  });

  this.getCarrito().subscribe(data => {
    data.forEach(element => {
     this.Acarrito.push(element.payload.doc.data())
     });; 
  });

  this.getAllCarritoID().subscribe(data => {
    data.forEach(element => {
     this.idCarrito.push(element.payload.doc.ref)
     });; 
  });

  this.carritoCollection = this.db.collection("carrito");
}

  getUsers(){
    return this.db.collection('usuarios').snapshotChanges();
  }

  addUsers(usuario: any, id: any){
    return this.db.collection('/usuarios').doc(id).set(
      {...usuario},
      {merge:true}
    );
  }

  updateUsers(usuario: Usuario){
    this.usuariosDoc = this.db.doc(`usuarios/${usuario.id}`);
    this.usuariosDoc.update(usuario);
  }

  addMenu(menu: Menu){
    return this.db.collection('/menu').add(menu);
  }

  addExtra(extra: Extra){
    return this.db.collection('/extra').add(extra);
  }

  getAllMenu(){
    return this.db.collection('menu').snapshotChanges();
  }

  getCarrito(){
    return this.db.collection('carrito').snapshotChanges();
  }

  CrearCarrito(carrito){
    return this.db.collection('/carrito').add(carrito);
  }

  addCarrito(menu,id){
    this.carritoCollection.doc(id).collection("Productos").add(menu);
  }

  deleteCarrito(item,id){
    this.carritoCollection.doc(item).collection("Productos").doc(id).delete()
  }

  getAllMenuID(){
    return this.db.collection('menu').snapshotChanges();
  }

  getAllCarritoID(){
    return this.db.collection('carrito').snapshotChanges();
  }
    
  getExtra(){
    return this.db.collection('extra').snapshotChanges();
  }

  
  getbyid(id){
    let aux: any;
    for(let i=0; i<this.usuariosCollection.get.length;i++){
      if(this.usuariosCollection[i].name===id.toString()){
        aux=this.usuariosCollection[i]
      }
    }
    return aux;
  }

  updateProductMenu(menu: Menu,item){
    this.MenuDoc = this.db.doc(`menu/${item.id}`);
    this.MenuDoc.update(menu);
  }

  deleteProductMenu(item){
    this.MenuDoc = this.db.doc(`menu/${item.id}`);
    this.MenuDoc.delete();
  }

  getProductos(id){
    this.ProductosCollection = this.carritoCollection.doc(id).collection("Productos")
    this.productos = this.ProductosCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Carrito;
        data.id = a.payload.doc.id;
        return data
      })
    }))

    return this.productos
  }

  getQueso(){
    var c=0;
    for(var i=0; i<this.Aextra.length; i++){
      if(this.Aextra[i].type == "queso"){
        this.Qextras[c] = this.Aextra[i];
        c++;
      }
    }
    return this.Qextras;
  }

  getJamon(){
    var d=0;
    for(var i=0; i<this.Aextra.length; i++){
      if(this.Aextra[i].type == "jamon"){
        this.Jextras[d] = this.Aextra[i];
        d++;
      }
    }
    return this.Jextras;
  }

  getChocolate(){
    var a=0;
    for(var i=0; i<this.Aextra.length; i++){
      if(this.Aextra[i].type == "chocolate"){
        this.Cextras[a] = this.Aextra[i];
        a++;
      }
    }
    return this.Cextras;
  }

  getAzucar(){
    var b=0;
    for(var i=0; i<this.Aextra.length; i++){
      if(this.Aextra[i].type == "azucar"){
        this.Aextras[b] = this.Aextra[i];
        b++;
      }
    }
    return this.Aextras;
  }

  getCarne(){
    var e=0;
    for(var i=0; i<this.Aextra.length; i++){
      if(this.Aextra[i].type == "carne"){
        this.Caextras[e] = this.Aextra[i];
        e++;
      }
    }
    return this.Caextras;
  }

  getPollo(){
    var f=0;
    for(var i=0; i<this.Aextra.length; i++){
      if(this.Aextra[i].type == "carneblanca"){
        this.Pextras[f] = this.Aextra[i];
        f++;
      }
    }
    return this.Pextras;
  }
}
