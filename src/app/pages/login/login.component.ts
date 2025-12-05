import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  lang = 'es';
  labels: Record<string, Record<string, string>> = {
    title: { es: 'Acceder', en: 'Login' },
    google: { es: 'Ingresar con Google', en: 'Sign in with Google' },
    email_placeholder: { es: 'Email', en: 'Email' },
    password_placeholder: { es: 'Password', en: 'Password' },
    button_login: { es: 'Login', en: 'Login' },
    register_prompt: { es: '¿No tienes cuenta?', en: "Don't have an account?" },
    register_button: { es: 'Regístrate', en: 'Register' }
  };

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private translate: TranslateService) {
    this.lang = this.translate.currentLang || 'es';
    this.translate.language$.subscribe((l) => (this.lang = l));
  }

  ngOnInit() {
    this.form = this.fb.group({ email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required, Validators.minLength(6)]] });
  }

  async loginWithGoogle() {
    await this.auth.loginWithGoogle();
    this.router.navigate(['/']);
  }

  async login() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    await this.auth.loginWithEmail(email!, password!);
    this.router.navigate(['/']);
  }

  statusMessage: string | null = null;

  async register() {
    console.log('register() clicked');
    this.statusMessage = null;
    if (this.form.invalid) {
      this.statusMessage = this.lang === 'es' ? 'Completa email y password (mín. 6 caracteres)' : 'Fill email and password (min. 6 chars)';
      return;
    }
    const { email, password } = this.form.value;
    try {
      await this.auth.registerWithEmail(email!, password!);
      this.statusMessage = this.lang === 'es' ? 'Registro correcto. Redirigiendo...' : 'Registration successful. Redirecting...';
      setTimeout(() => this.router.navigate(['/']), 800);
    } catch (err: any) {
      this.statusMessage = err?.message || (this.lang === 'es' ? 'Error al registrar' : 'Registration error');
    }
  }
}
