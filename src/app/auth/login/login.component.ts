import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder,
              private service: AuthService,
              private router: Router,
              private alert: AlertService) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  login() {
    if (this.form.invalid){
      this.form.markAllAsTouched();
    }
    const { email, senha } = this.form.value;

    this.service.login({ email, senha }).subscribe({
      next: (resposta) => {
        localStorage.setItem('token', resposta.token);
        this.router.navigate(['/usuarios']);
      },
      error: () => {
        this.alert.error('Ops!','Ocorreu algum erro ao tentar fazer login!')
      }
    });
  }

}
