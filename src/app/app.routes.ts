import { Routes } from '@angular/router';
import { Landing } from './components/landing/landing';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: "",
        component: Landing
    }, 
    {
        path: "dashboard",
        component: Dashboard,
        canActivate: [authGuard]
    }
];
