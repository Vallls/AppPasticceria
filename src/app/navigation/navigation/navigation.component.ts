import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public fireAuth: AuthService) {
    
  }

OpNavbar(){
  return this.fireAuth.navbar;
}
  ngOnInit() {
  }

}
