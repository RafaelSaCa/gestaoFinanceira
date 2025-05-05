import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';
import { UsuariosComponent } from './usuario/usuarios/usuarios.component';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: '', redirectTo: 'auth/login', pathMatch: 'full'
    },
    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AuthGuard]
    }
];
