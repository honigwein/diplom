import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['login-page.component.css']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  error: any = '';
  constructor(private http: HttpClient, private apiService: ApiService, private router: Router) {}

  login() {
    if (!this.username || !this.password) {
      this.error = 'Заповніть всі поля';
      return;
    }
    const loginData = {
      username: this.username,
      password: this.password
    };
    this.apiService.request('login/', 'POST', loginData).subscribe(
      responce => {
        localStorage.setItem('access_token', responce.access);
        localStorage.setItem('refresh_token', responce.refresh);
        this.router.navigate(['/events']);
      },
      error => {
        if (error instanceof ProgressEvent && error.type === 'error') {
          this.error = 'Помилка з`єднання з сервером, спробуйте пізніше';
          return;
        }
        this.error = Object.values(error)[0];
        if (this.error.includes('given credentials')) {
          this.error = 'Невірний логін або пароль';
        }
      }
    );
  }
  register() {
    if (!this.username || !this.password) {
      this.error = 'Заповніть всі поля';
      return;
    }
    const registerData = {
      username: this.username,
      password: this.password
    };
    this.http.post('http://141.148.245.77:5005/api/register/', registerData).subscribe(
      responce => {
        this.login();
      },
      error => {
        if (error.status === 0) {
          this.error = 'Помилка з`єднання з сервером, спробуйте пізніше';
          return;
        }
        this.error = Object.values(error.error)[0];
        this.error = this.error[0];
        if (this.error.includes('already exists')) {
          this.error = 'Користувач з таким ім`ям вже існує';
          return;
        }
      }
    );
  }
}
