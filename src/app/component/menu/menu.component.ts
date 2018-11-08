import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Menu } from 'src/app/models/usuarios';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  closeResult: string;
  pans = [];
  croissants = [];
  pastelitos = [];
  dulces = [];
  tortas = [];

  constructor(private modalService: NgbModal, private firestoreService: FirestoreService,) {
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
