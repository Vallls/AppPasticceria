import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario, Menu } from 'src/app/models/usuarios';
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

  addMenu(menu: any){
    return this.db.collection('/menu').add(menu);
  }

  getAllMenu(){
    return this.db.collection('menu').snapshotChanges();
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

  updateProductMenu(menu: Menu){
    this.MenuDoc = this.db.doc(`menu/${menu.id}`);
    this.MenuDoc.update(menu);
  }

  deleteProductMenu(menu: Menu){
    this.MenuDoc = this.db.doc(`menu/${menu.id}`);
    this.MenuDoc.delete();
  }
  
  addcarrito(usuario,producto){
    this.usuariosDoc = this.db.doc(`usuarios/${usuario.id}`)

  }
}
