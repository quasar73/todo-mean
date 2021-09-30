import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule } from './shared/services/auth';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NavBarComponent } from './shared/layouts/main-layout/nav-bar/nav-bar.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { ListPageComponent } from './components/list-page/list-page.component';
import { ItemComponent } from './components/item/item.component';

@NgModule({
    declarations: [
        AppComponent,
        AuthLayoutComponent,
        LoginPageComponent,
        RegisterPageComponent,
        MainLayoutComponent,
        MainPageComponent,
        NavBarComponent,
        ToDoListComponent,
        ListPageComponent,
        ItemComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        AuthenticationModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
