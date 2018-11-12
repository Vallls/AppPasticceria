import { Component, OnInit, Input, Output } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { Usuario } from 'src/app/models/usuarios';
import {FormComponent } from 'src/app/component/form/form.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css'],
  providers: [FormComponent]

})
export class NavbarUserComponent implements OnInit {
  
  

  

  constructor(private FC: FormComponent) {
   
    console.log(this.USER);
  }
  ngOnInit() {
    
  }
}


