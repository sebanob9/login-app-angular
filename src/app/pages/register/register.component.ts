import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UserModel;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = new UserModel;
    this.user.email = 'sebanob9@gmail.com';
  }

  onSubmit(form: NgForm) {

    if (form.invalid) { return;}
    
    console.log(this.user);
    this.auth.newUser(this.user)
      .subscribe( resp => {
        console.log('response: ',resp);
      }, (err) => {
        console.log(err.error.error.message);
      });

  }
}
