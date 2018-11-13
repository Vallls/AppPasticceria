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

  panCollection: AngularFirestoreCollection;
  pan: Observable<Menu[]>;
  panDoc: AngularFirestoreDocument;

  croissantCollection: AngularFirestoreCollection;
  croissant: Observable<Menu[]>;
  croissantDoc: AngularFirestoreDocument;

  pastelitoCollection: AngularFirestoreCollection;
  pastelito: Observable<Menu[]>;
  pastelitoDoc: AngularFirestoreDocument;

  tortaCollection: AngularFirestoreCollection;
  torta: Observable<Menu[]>;
  tortaDoc: AngularFirestoreDocument;

  dulceCollection: AngularFirestoreCollection;
  dulce: Observable<Menu[]>;
  dulceDoc: AngularFirestoreDocument;

  constructor(public db: AngularFirestore, ) {
    this.usuariosCollection = this.db.collection('usuarios');
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => { 
      const data = a.payload.doc.data() as Usuario; 
      data.id = a.payload.doc.id;
      return data;
   });
 }));

 this.panCollection = this.db.collection('pan');
    this.pan = this.panCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => { 
      const data = a.payload.doc.data() as Menu; 
      data.id = a.payload.doc.id;
      return data;
   });
 }));

 this.croissantCollection = this.db.collection('croissant');
    this.croissant = this.croissantCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => { 
      const data = a.payload.doc.data() as Menu; 
      data.id = a.payload.doc.id;
      return data;
   });
 }));

 this.pastelitoCollection = this.db.collection('pastelito');
    this.pastelito = this.pastelitoCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => { 
      const data = a.payload.doc.data() as Menu; 
      data.id = a.payload.doc.id;
      return data;
   });
 }));

 this.tortaCollection = this.db.collection('torta');
    this.torta = this.tortaCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => { 
      const data = a.payload.doc.data() as Menu; 
      data.id = a.payload.doc.id;
      return data;
   });
 }));

 this.dulceCollection = this.db.collection('dulce');
    this.dulce = this.dulceCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => { 
      const data = a.payload.doc.data() as Menu; 
      data.id = a.payload.doc.id;
      return data;
   });
 }));
}

  getUsers(){
    return this.usuarios;
  }

  addUsers(usuario: Usuario){
    this.usuariosCollection.add(usuario);
  }

  updateUsers(usuario: Usuario){
    this.usuariosDoc = this.db.doc(`usuarios/${usuario.id}`);
    this.usuariosDoc.update(usuario);
  }

  getPan(){
    return this.pan;
  }

  addPan(pan: Menu){
    this.panCollection.add(pan);
  }

  getCroissant(){
    return this.croissant;
  }

  addCroissant(croissant: Menu){
    this.croissantCollection.add(croissant);
  }

  getPastelito(){
    return this.pastelito;
  }

  addPastelito(pastelito: Menu){
    this.pastelitoCollection.add(pastelito);
  }

  getTorta(){
    return this.torta;
  }

  addTorta(torta: Menu){
    this.tortaCollection.add(torta);
  }

  getDulce(){
    return this.dulce;
  }

  addDulce(dulce: Menu){
    this.dulceCollection.add(dulce);
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

  updateProductPan(pan: Menu){
    this.panDoc = this.db.doc(`pan/${pan.id}`);
    this.panDoc.update(pan);
  }

  updateProductCroissant(croissant: Menu){
    this.croissantDoc = this.db.doc(`croissant/${croissant.id}`);
    this.croissantDoc.update(croissant);
  }

  updateProductPastelito(pastelito: Menu){
    this.pastelitoDoc = this.db.doc(`pastelito/${pastelito.id}`);
    this.pastelitoDoc.update(pastelito);
  }

  updateProductTorta(torta: Menu){
    this.tortaDoc = this.db.doc(`torta/${torta.id}`);
    this.tortaDoc.update(torta);
  }

  updateProductDulce(dulce: Menu){
    this.dulceDoc = this.db.doc(`dulce/${dulce.id}`);
    this.dulceDoc.update(dulce);
  }

  deleteProductPan(pan: Menu){
    this.panDoc = this.db.doc(`pan/${pan.id}`);
    this.panDoc.delete();
  }

  deleteProductCroissant(croissant: Menu){
    this.croissantDoc = this.db.doc(`croissant/${croissant.id}`);
    this.croissantDoc.delete();
  }

  deleteProductPastelito(pastelito: Menu){
    this.pastelitoDoc = this.db.doc(`pastelito/${pastelito.id}`);
    this.pastelitoDoc.delete();
  }

  deleteProductTorta(torta: Menu){
    this.tortaDoc = this.db.doc(`torta/${torta.id}`);
    this.tortaDoc.delete();
  }

  deleteProductDulce(dulce: Menu){
    this.dulceDoc = this.db.doc(`dulce/${dulce.id}`);
    this.dulceDoc.delete();
  }

  addcarrito(usuario,producto){
    this.usuariosDoc = this.db.doc(`usuarios/${usuario.id}`)

  }
}
