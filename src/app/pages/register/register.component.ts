import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UserModel;

  constructor() { }

  ngOnInit() {
    this.user = new UserModel;
    this.user.email = 'sebanob9@gmail.com';
  }

  onSubmit(form: NgForm) {

    if (form.invalid) { return;}
    console.log('Form sended');
    console.log(this.user);
    console.log(form)
  }
}
