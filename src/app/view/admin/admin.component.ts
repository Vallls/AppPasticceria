import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuarios';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';


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
  constructor(private firestoreService: FirestoreService, private route:ActivatedRoute,private modalService: NgbModal, private fireAuth: AuthService) {
    this.UID = this.fireAuth.getUser();
    this.usuarios = firestoreService.Ausuario;
    this.name = this.getName();
    this.lastname = this.getLastname();
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
  UsertoEdit: Usuario;

  EditarUsuarioTrue(item){
    this.UsertoEdit = item;
    this.DisponibilidadTrue();
    this.UpdateUser();
  }

  EditarUsuarioFalse(item){
    this.UsertoEdit = item;
    this.DisponibilidadFalse();
    this.UpdateUser();
  }

  UpdateUser(){
    this.firestoreService.updateUsers(this.UsertoEdit)
  }

  DisponibilidadTrue(){
    this.UsertoEdit.admin = true;
  }

  DisponibilidadFalse(){
    this.UsertoEdit.admin = false;
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
