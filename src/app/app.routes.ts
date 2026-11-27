import { Routes } from '@angular/router';
import { Landing } from './components/landing/landing';
import { Dashboard } from './components/dashboard/dashboard';
import { Barbershops } from './components/barbershops/barbershops';
import { barbershopGuard } from './guards/barbershop-guard';
import { BarbersPageComponent } from './pages/barbers-page.compoment/barbers-page.component';

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
        path: "barbers",
        component: BarbersPageComponent,
        canActivate: [barbershopGuard]
    },
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [barbershopGuard]
    }
];
