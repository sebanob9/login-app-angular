import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UserModel;
  remember = false;

  constructor(private auth: AuthService,
              private router: Router ) { }

  ngOnInit() {
    this.user = new UserModel;
  }

  onSubmit(form: NgForm) {

    if (form.invalid) { return;}
    
    console.log(this.user);
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Please wait'
    });
    this.auth.newUser(this.user)
      .subscribe( resp => {
        console.log('response: ',resp);
        Swal.close();

        if (this.remember) {
          localStorage.setItem('email', this.user.email);
        }

        this.router.navigateByUrl('/home');
        
      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'warning',
          text: err.error.error.message
        });
      });

  }
}
