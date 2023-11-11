import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  incorrectCredentials = false;

  constructor(private router: Router, private formBuilder: FormBuilder, public loginService: LoginService) {
    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$")]],
        password: ['', Validators.required]
    });
}

login() {
  if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      // Llama al servicio para autenticar al usuario
      this.loginService.login(email, password).subscribe(
          response => {
              if (response.user && response.token) {
                // Almacena el token utilizando el método setAuthToken
                  this.loginService.setToken(response.token);
                  this.router.navigate(['/dashboard']);
              } else {
                this.incorrectCredentials = true;
              }
          },
          error => {
              console.error('Error en la solicitud al servidor', error);
          }
      );
  }
}

}