import { HttpErrorResponse } from '@angular/common/http';
import { RegisterModel } from './../../shared/models/register.model';
import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ConfirmValidator } from 'src/app/shared/validators/confirm.validator';
import { AuthenticationService } from 'src/app/shared/services/auth';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss'],
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
export class RegisterPageComponent implements AfterViewInit, OnInit {
    cardState = 'invisible';
    alreadyExist = false;
    isPending = false;
    isSuccess = false;
    registerForm: FormGroup = new FormGroup(
        {
            email: new FormControl('', [Validators.required, Validators.email]),
            userName: new FormControl('', [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(16),
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(5),
            ]),
            confirmPassword: new FormControl('', [Validators.required]),
        },
        {
            validators: [
                ConfirmValidator.equalValidator('password', 'confirmPassword'),
            ],
        }
    );

    get getExistMessage(): string {
        return this.alreadyExist ? 'This user is already exist' : '⠀';
    }

    get getSuccessMessage(): string {
        return this.isSuccess ? 'Success! Now you can sign in!' : '';
    }

    constructor(
        private authService: AuthenticationService,
        private titleService: Title
    ) {}

    ngOnInit(): void {
        this.titleService.setTitle('Sign Up');
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.cardState = 'visible';
        }, 0);
    }

    signup(): void {
        if (!this.registerForm.invalid) {
            this.alreadyExist = false;
            this.isPending = true;
            this.isSuccess = false;
            const registerModel: RegisterModel = {
                email: this.registerForm.controls.email.value,
                userName: this.registerForm.controls.userName.value,
                password: this.registerForm.controls.password.value,
                confirmPassword:
                    this.registerForm.controls.confirmPassword.value,
            };

            if (this.registerForm.valid) {
                this.authService.registrate(registerModel).subscribe(
                    () => {
                        this.isPending = false;
                        this.isSuccess = true;
                        this.registerForm.reset();
                    },
                    (err: HttpErrorResponse) => {
                        this.isPending = false;
                        if (err.status === 409) {
                            this.alreadyExist = true;
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
        } else if (control.hasError('minlength')) {
            error = 'Min length is 5';
        } else if (control.hasError('notEqual')) {
            error = 'Password mismatch';
        }

        return error;
    }
}
