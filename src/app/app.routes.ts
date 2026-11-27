import { Routes } from '@angular/router';
import { Landing } from './components/landing/landing';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { Barbershops } from './components/barbershops/barbershops';
import { barbershopGuard } from './guards/barbershop-guard';

export const routes: Routes = [
    {
        path: "",
        component: Landing
    },
    {
        path: 'barbershops',
        component: Barbershops
    },
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [barbershopGuard]
    }
];
