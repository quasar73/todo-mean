import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/shared/models/login.model';
import { AuthenticationService } from 'src/app/shared/services/auth';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
    animations: [
        trigger('cardOpen', [
            state(
                'invisible, void',
                style({
                    'margin-top': '-256px',
                    opacity: '0',
                })
            ),
            state(
                'visible',
                style({
                    'margin-top': '0px',
                    opacity: '1',
                })
            ),
            transition(
                'invisible=>visible',
                animate('0.6s cubic-bezier(0.33, 1, 0.68, 1)')
            ),
        ]),
    ],
})
export class LoginPageComponent implements AfterViewInit, OnInit {
    cardState = 'invisible';
    isPending = false;
    wrongCredentials = false;
    loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });

    get getCredsMessage(): string {
        return this.wrongCredentials ? 'Wrong Email or password!' : '⠀';
    }

    constructor(
        private authService: AuthenticationService,
        private router: Router,
        private titleService: Title
    ) {}

    ngOnInit(): void {
        this.authService.isAuthorized().subscribe((result) => {
            if (result) {
                this.router.navigate(['/main']);
            }
        });

        this.titleService.setTitle('Sign In');
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.cardState = 'visible';
        }, 0);
    }

    signin(): void {
        if (!this.loginForm.invalid) {
            this.isPending = true;
            this.wrongCredentials = false;
            const loginModel: LoginModel = {
                email: this.loginForm.controls.email.value,
                password: this.loginForm.controls.password.value,
            };

            if (this.loginForm.valid) {
                this.authService.login(loginModel).subscribe(
                    () => {
                        this.router.navigate(['/main']);
                    },
                    (err: HttpErrorResponse) => {
                        this.isPending = false;
                        if (err.status === 403) {
                            this.wrongCredentials = true;
                        }
                    }
                );
            }
        }
    }

    getErrorMessage(control: AbstractControl): string {
        let error = '';

        if (control.hasError('required')) {
            error = 'This field is required';
        } else if (control.hasError('email')) {
            error = 'Enter Email adress';
        }

        return error;
    }
}
