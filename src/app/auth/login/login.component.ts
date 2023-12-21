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
  error: string = '';

  constructor(private router: Router, private formBuilder: FormBuilder, public loginService: LoginService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")]],
      password: ['', Validators.required]
  });
}

ngOnInit() {
  if (this.loginService.isAuthenticated()) {
    this.router.navigate(['/dashboard']);
  }
}


login() {
  if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.loginService.login(email, password).subscribe(
          response => {
              if (response.user && response.token) {
                  this.loginService.setToken(response.token[0]);
                  this.router.navigate(['/dashboard']);
              } else {
                this.incorrectCredentials = true;
                this.error = "Credenciales incorrectas, intente de nuevo"
              }
          },
          error => {
              console.error('Error en la solicitud al servidor', error);
              this.incorrectCredentials = true;
              this.error = "Error en el servidor, intente de nuevo"
          }
      );
  }
}

}