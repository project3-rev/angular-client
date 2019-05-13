import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  firstName : string = localStorage.getItem("firstName");

  
  

  constructor(private auth: AuthService, private route: Router, private title: Title) {
   }
  

  ngOnInit() {

    let userId = localStorage.getItem("userId");
    console.log(sessionStorage.getItem(userId))
    this.title.setTitle('Screen Force - Home');
    if (!this.auth.isLoggedIn()) {
      this.route.navigateByUrl('login');
    }

  }

}
