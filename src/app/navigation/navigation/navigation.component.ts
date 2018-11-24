import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  state = 'inicio';

  constructor(public fireAuth: AuthService) {
    this.fireAuth.navbar.subscribe(data => {
      console.log(data,'estado')
      this.OpNavbar(data)
    })
  }

OpNavbar(value){
  this.state = value;
  
}
  ngOnInit() {
  }

}
