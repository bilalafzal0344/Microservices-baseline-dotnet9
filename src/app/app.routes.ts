import { Routes } from '@angular/router';
import { Login } from './pages/accounts/login/login';
import { Header } from './pages/nevbar/header/header';
import { Dashboard } from './pages/dashboard/dashboard/dashboard';
import { CreateEmp } from './pages/hrm/create-emp/create-emp';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
       {
        path: 'login',
        component: Login
    },
        {
        path: '',
        component: Header,
        children :[
        {
            path:'dashboard',
            component: Dashboard
        },
        {
            path:'createemp',
            component: CreateEmp
        }
      ]   
    }
];
