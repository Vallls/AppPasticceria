import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuarios';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  usuario;
  constructor(private firestoreService: FirestoreService, private route:ActivatedRoute,) { }

  ngOnInit() {
    this.usuario=this.firestoreService.getbyid(this.route.snapshot.paramMap.get('id'))
  }

}
