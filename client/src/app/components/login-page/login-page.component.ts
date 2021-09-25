import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
export class LoginPageComponent implements AfterViewInit {
    cardState = 'invisible';
    loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });

    constructor() {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.cardState = 'visible';
        }, 0);
    }
}
