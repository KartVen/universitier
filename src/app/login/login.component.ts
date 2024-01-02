import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BrowserService } from '../_services/browser.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService, Login } from '../_services/auth.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  formError: string | null = null;

  constructor(
    private readonly browserService: BrowserService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.browserService.isLoggedIn() && this.router.navigate(['/dashboard']);

    this.formLogin = this.formBuilder.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    const rawFormData = this.formLogin.getRawValue();
    const onLogin: Login = {
      usernameOrEmail: rawFormData.email,
      password: rawFormData.password,
    };
    this.formLogin.valid &&
      this.authService.login(onLogin).subscribe({
        next: data => {
          this.browserService.save(data);
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          console.log('formError', err);
          switch (err.status) {
            case 400:
            case 401:
              this.formError = 'Nieprawidłowy email lub hasło.';
              break;
            default:
              this.formError = 'Wystąpił błąd podczas logowania.';
          }
        },
      });
  }
}
