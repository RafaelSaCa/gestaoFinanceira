import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder,
              private service: AuthService,
              private router: Router,
              private alert: AlertService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      sobrenome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
    });
  }


  cadastrar() {
    if (this.form.invalid){
      this.form.markAllAsTouched();
    }
    const dados = this.form.value;

    this.service.register(dados).subscribe({
      next: (resposta) => {
        console.log(this.form.value);
        this.alert.success('Cadastro realizado!', 'Conta criada com sucesso!'),
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.alert.error('Ops!','Ocorreu algum erro ao tentar registrar-se!')
      }
    });
  }
}
