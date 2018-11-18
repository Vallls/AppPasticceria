import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Menu } from 'src/app/models/usuarios';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { element } from '@angular/core/src/render3/instructions';

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
  menu = [];
  idMenu = [];
  ItemtoEdit: Menu;
  variable;
  var;

  Menu = {} as Menu;

  constructor(private modalService: NgbModal, private firestoreService: FirestoreService,private afStorage: AngularFireStorage,) {
    this.menu = firestoreService.Amenu;
    this.idMenu = firestoreService.idMenu;
    console.log(this.menu)
    console.log(this.idMenu)
  }

  encontrar(item){
    this.var = this.menu.indexOf(item);
  }

  EditarProducto(event,item){
    this.ItemtoEdit = item;
  }

  guardar(){
    this.variable = this.idMenu[this.var];
    console.log(this.variable);
  }

  Disponibilidad(variable){
    this.ItemtoEdit.available = variable;
  }

  UpdateProductMenu(){
    this.firestoreService.updateProductMenu(this.ItemtoEdit,this.variable)
  }

 
  DeleteProductMenu(){
    this.firestoreService.deleteProductMenu(this.variable)
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
