import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario, Menu, Carrito, Extra,Historial, Pedidos } from 'src/app/models/usuarios';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  
  usuariosCollection: AngularFirestoreCollection;
  usuarios: Observable<Usuario[]>;
  usuariosDoc: AngularFirestoreDocument;
  Ausuario = [];
  usuario: Observable<Menu>

  menuCollection: AngularFirestoreCollection;
  Menu: Observable<Menu[]>;
  MenuDoc: AngularFirestoreDocument;
  idMenu = [];
  

  extraCollection: AngularFirestoreCollection;
  Aextra = [];
  Cextras = [];
  Aextras = [];
  Qextras = [];
  Jextras = [];
  Caextras: Observable<Extra[]>;
  Pextras = [];

  carritoCollection: AngularFirestoreCollection;
  Acarrito = [];
  idCarrito = [];
  ProductosCollection: AngularFirestoreCollection;
  productos: Observable<Carrito[]>;

  historialCollection: AngularFirestoreCollection
  historialDoc: AngularFirestoreDocument
  Ahistorial = []
  idHistorial = []
  PHistorialCollection: AngularFirestoreCollection;
  phistorial: Observable<Carrito[]>;

  pedidosCollection: AngularFirestoreCollection;
  pedidosDoc: AngularFirestoreDocument
  Apedidos = [];
  idpedidos = []
  Pedidos:Observable<Pedidos[]>;


  constructor(public db: AngularFirestore,) {
  this.getUsers().subscribe(data => {
    data.forEach(element => {
      this.Ausuario.push(element.payload.doc.data())
    });
  });

  this.getAllMenuID().subscribe(data => {
    data.forEach(element => {
     this.idMenu.push(element.payload.doc.ref)
     });; 
  });

  // this.getExtra().subscribe(data => {
  //   data.forEach(element => {
  //    this.Aextra.push(element.payload.doc.data())
  //    });; 
  // });

  this.getCarrito().subscribe(data => {
    data.forEach(element => {
     this.Acarrito.push(element.payload.doc.data())
     });; 
  });

  this.getHistorial().subscribe(data => {
    data.forEach(element => {
     this.Ahistorial.push(element.payload.doc.data())
     });; 
  });

  this.getPedidos().subscribe(data => {
    data.forEach(element => {
     this.Apedidos.push(element.payload.doc.data())
     });; 
  });

  this.getPedidos().subscribe(data => {
    data.forEach(element => {
     this.idpedidos.push(element.payload.doc.ref)
     });; 
  });

  this.getAllCarritoID().subscribe(data => {
    data.forEach(element => {
     this.idCarrito.push(element.payload.doc.ref)
     });; 
  });

  this.getAllHistorialID().subscribe(data => {
    data.forEach(element => {
     this.idHistorial.push(element.payload.doc.ref)
     });; 
  });

  this.carritoCollection = this.db.collection("carrito");
  this.historialCollection = this.db.collection("historial");
  this.pedidosCollection = this.db.collection("pedidos");
}

getAllPedidos(){
  this.pedidosCollection= this.db.collection('pedidos')
  this.Pedidos = this.pedidosCollection.valueChanges();
  return this.Pedidos
}

getAllUsuarios(){
  this.usuariosCollection= this.db.collection('usuarios')
  this.usuarios = this.usuariosCollection.valueChanges();
  return this.usuarios
}

getAllExtra(){
  this.extraCollection = this.db.collection('extra')
  this.Caextras = this.extraCollection.valueChanges();
  return this.Caextras
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
    this.usuariosDoc.set(
      {...usuario},
      {merge:true});
  }

  addMenu(menu: Menu){
    return this.db.collection('/menu').add(menu);
  }

  addExtra(extra: Extra){
    return this.db.collection('/extra').add(extra);
  }

  getAllMenu(){
    this.menuCollection= this.db.collection('menu')
    this.Menu = this.menuCollection.valueChanges();
    return this.Menu
  }

  getCarrito(){
    return this.db.collection('carrito').snapshotChanges();
  }

  getHistorial(){
    return this.db.collection('historial').snapshotChanges();
  }

  getPedidos(){
    return this.db.collection('pedidos').snapshotChanges();
  }

  CrearCarrito(carrito){
    return this.db.collection('/carrito').add(carrito);
  }

  CrearHistorial(historial){
    return this.db.collection('/historial').add(historial);
  }

  addHistorial(id,array,npedido,item,item2){
    for(var i=0; i<array.length; i++){
      array[i].npedido = npedido;
      this.historialCollection.doc(id).collection("Historial").add(array[i])
    }
    this.historialDoc = this.db.doc(`historial/${item.id}`);
    item2.npedido = item2.npedido+1
    this.historialDoc.update(item2);
  }

  addPedidos(array,usuario,total){
    console.log(this.Apedidos.length)
    if(this.Apedidos.length == 0){
      for(var i=0; i<array.length; i++){
        array[i].npedidoadmin = 1;
        array[i].usuario = usuario
        array[i].price = total
        this.pedidosCollection.add(array[i])
      }
      }else{
        this.Apedidos.sort(function(a,b){
          if(a.npedidoadmin > b.npedidoadmin){
            return 1
          }
          if(a.npedidoadmin < b.npedidoadmin){
            return -1
          }
          return 0
        })
        for(var i=0; i<this.Apedidos.length;i++){
          var ultimopedido = this.Apedidos[i].npedidoadmin
        }
        for(var i=0; i<array.length; i++){
          array[i].npedidoadmin = ultimopedido+1;
          array[i].usuario = usuario
          array[i].price = total
          this.pedidosCollection.add(array[i])
        }
      }
    }

  deleteAllCarrito(id,array){
    for(var i=0; i<array.length; i++){
      this.carritoCollection.doc(id).collection("Productos").doc(array[i].id).delete()
    }
  }

  addCarrito(menu,id){
    this.carritoCollection.doc(id).collection("Productos").add(menu).then(() =>{
      alert("El menu se ha agregado satisfactoriamente al carrito");
    });
  }

  deleteCarrito(item,id){
    if(confirm("Estas seguro de eliminar el menu?")==true){
      this.carritoCollection.doc(item).collection("Productos").doc(id).delete()
    }
    
  }

  deletePedido(item){
    this.pedidosDoc = this.db.doc(`pedidos/${item.id}`);
    if(confirm("Estas seguro de eliminar el pedido?")==true){
      this.pedidosDoc.delete();
    }
  }

  getAllMenuID(){
    return this.db.collection('menu').snapshotChanges();
  }

  getAllCarritoID(){
    return this.db.collection('carrito').snapshotChanges();
  }

  getAllHistorialID(){
    return this.db.collection('historial').snapshotChanges();
  }
    
  // getExtra(){
  //   return this.db.collection('extra').snapshotChanges();
  // }

  
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
    this.MenuDoc.update(menu).then(() =>{
      alert("Se ha actualizado el menu satisfactoriamente")
    }).catch(()=>{
      alert("No se pudo actualizar el menu")
    }) 
  }

  deleteProductMenu(item){
    this.MenuDoc = this.db.doc(`menu/${item.id}`);
    if(confirm("Estas seguro de eliminar el menu?")==true){
      this.MenuDoc.delete();
    }
   
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

  getPHistorial(id){
    this.PHistorialCollection = this.historialCollection.doc(id).collection("Historial")
    this.phistorial = this.PHistorialCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Historial;
        data.id = a.payload.doc.id;
        return data
      })
    }))

    return this.phistorial
  }

  
}
