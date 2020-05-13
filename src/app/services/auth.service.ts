import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyBv0ZAo3GBqxrFTqnrWZs2IdokX7o3Rx-Q';

  // create new user
  /* https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY] */

  // login
 /*  https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]  */

  constructor(private http: HttpClient) { }

  newUser(user: UserModel) {
    const authData = {
      /* email: user.email,
      password: user.password, */
      ...user,
      returnSecureToken: true
    }

    return this.http.post(
      `${ this.url }signUp?key=${ this.apikey }`,
      authData
    );
  }

  login(user: UserModel) {}

  logout() {}

}
