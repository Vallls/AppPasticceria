import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuarios';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  usuario;
  constructor(private firestoreService: FirestoreService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.usuario=this.firestoreService.getbyid(this.route.snapshot.paramMap.get('id'))
  }

}
