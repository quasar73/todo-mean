import { ListPageComponent } from './components/list-page/list-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedGuard } from 'ngx-auth';

const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            { path: '', redirectTo: '/login', pathMatch: 'full' },
            { path: 'login', component: LoginPageComponent },
            { path: 'register', component: RegisterPageComponent },
        ],
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [ProtectedGuard],
        children: [
            { path: 'main', component: MainPageComponent },
            {
                path: 'list/:id',
                component: ListPageComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
