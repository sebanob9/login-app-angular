import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyBv0ZAo3GBqxrFTqnrWZs2IdokX7o3Rx-Q';

  userToken: string;

  constructor(private http: HttpClient) { 
    this.readToken();
  }

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
    ).pipe(
      map(resp => {
          console.log('Success in map RXJS', resp)
          this.saveToken(resp['idToken'] );
          return resp;
      })
    );
  }

  login(user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true
    }

    return this.http.post(
      `${ this.url }signInWithPassword?key=${ this.apikey }`,
      authData
    ).pipe(
      map(resp => {
          console.log('Success in map RXJS', resp['idToken'])
          this.saveToken(resp['idToken'] );
          return resp;
      })
    );
  }

  saveToken (idToken : string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    let today = new Date();
    today.setSeconds(3600);
    localStorage.setItem('expires', today.getTime().toString() );
    // primero le incluyo una hora mas, luego le cambio el formato con getTime y lo convierto a string, pues solo se puede guardar strings
  }

  readToken() {
    if ( localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  isAuthenticated() : boolean {
    if (this.userToken.length < 2) {
      return false;
    }

    const expires = Number(localStorage.getItem('expires')); // traigo la fecha y la convierto a numero nuevamente
    const expiresDate = new Date(); // creamos la fecha en que expira
    expiresDate.setTime(expires); // se le da el valor que viene del localStorage

    if (expiresDate > new Date () ) {
      return true; // si la hora de exporacion es mayor, es válido.. sino es falso
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
  }
  
}
