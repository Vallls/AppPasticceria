import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Menu } from 'src/app/models/usuarios';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-mmenu',
  templateUrl: './mmenu.component.html',
  styleUrls: ['./mmenu.component.css']
})
export class MmenuComponent implements OnInit {

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  uploadState: Observable<string>;
  downloadURL: Observable<string>;

  closeResult: string;
  pans = [];
  croissants = [];
  pastelitos = [];
  dulces = [];
  tortas = [];
  ItemtoEdit: Menu;
  variable;

  Menu = {} as Menu;

  constructor(private modalService: NgbModal, private firestoreService: FirestoreService,private afStorage: AngularFireStorage,) {
    this.firestoreService.getPan().subscribe(pan => {
      this.pans = pan;
    });

    this.firestoreService.getCroissant().subscribe(croissant => {
      this.croissants = croissant;
    });

    this.firestoreService.getPastelito().subscribe(pastelito => {
      this.pastelitos = pastelito;
    });

    this.firestoreService.getTorta().subscribe(torta => {
      this.tortas = torta;
    });

    this.firestoreService.getDulce().subscribe(dulce => {
      this.dulces = dulce;
    });

  }

  EditarProducto(event,item){
    this.ItemtoEdit = item;
  }

  guardar(item){
    this.variable = item;
  }

  Disponibilidad(variable){
    this.ItemtoEdit.avaible = variable;
  }

  UpdateProductPan(){
    this.firestoreService.updateProductPan(this.ItemtoEdit)
  }

  UpdateProductCroissant(){
    this.firestoreService.updateProductCroissant(this.ItemtoEdit)
  }

  UpdateProductPastelito(){
    this.firestoreService.updateProductPastelito(this.ItemtoEdit)
  }

  UpdateProductTorta(){
    this.firestoreService.updateProductTorta(this.ItemtoEdit)
  }

  UpdateProductDulce(){
    this.firestoreService.updateProductDulce(this.ItemtoEdit)
  }

  DeleteProductPan(event,pan){
    this.firestoreService.deleteProductPan(pan)
  }

  DeleteProductCroissant(event,croissant){
    this.firestoreService.deleteProductCroissant(croissant)
  }

  DeleteProductPastelito(event,pastelito){
    this.firestoreService.deleteProductPastelito(pastelito)
  }

  DeleteProductTorta(event,torta){
    this.firestoreService.deleteProductTorta(torta)
  }

  DeleteProductDulce(event,dulce){
    this.firestoreService.deleteProductDulce(dulce)
  }

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL(); 
      })
    ).subscribe();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          this.ItemtoEdit.img = url;
          
        });
      })
    ).subscribe();
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

  ngOnInit() {
  }

}
