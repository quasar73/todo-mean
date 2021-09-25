import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
export class RegisterPageComponent implements AfterViewInit {
    cardState = 'invisible';
    registerForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        userName: new FormControl('', [Validators.required, Validators.minLength(5)]),
        password: new FormControl('', [Validators.required]),
        repeatPassword: new FormControl('', [Validators.required]),
    });

    constructor() {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.cardState = 'visible';
        }, 0);
    }
}
