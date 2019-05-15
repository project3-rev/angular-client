import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { GatewayService } from 'src/app/services/gateway.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = new User();
  public message: Object = new Object();
  public submitted: boolean = false;
  public rememberMe: boolean = false;

  private test: Object = {
    first: 'Bob',
    email: 'test@mail.com'
  };

  constructor(private auth: AuthService, private router: Router, private service: GatewayService, private title: Title) {
    if (localStorage.getItem('USER_EMAIL')) {
      this.user.email = localStorage.getItem('USER_EMAIL');
      this.rememberMe = true;
    }
  }

  ngOnInit() {
    this.title.setTitle('Screen Force - Login');
  }

  // Add (ngSubmit)='onSubmit()' to Form in template if used
  /**Turns this.submitted to true */
  public onSubmit() { this.submitted = true; }

  /**Handles logic related to User Login*/
  public Login() {

    this.service.login(this.user).subscribe(
      data => this.message = data,
      err => console.error(err),
      () => {
        if (this.message['email']) {
          this.user = this.message;
          this.auth.login(this.user);
          localStorage.removeItem('USER_EMAIL');
          if (this.rememberMe) {
            localStorage.setItem('USER_EMAIL', this.user.email);
          }
          this.router.navigateByUrl('home');
        }
        else {
          this.user.password = '';
        }
      }
    );
  }

}
