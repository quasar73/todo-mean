import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/shared/services/auth';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
    constructor(
        private titleService: Title,
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit(): void {
        this.authenticationService.getUserData().subscribe((data) => {
            this.titleService.setTitle(`${data.userName} | Menu`);
        })
    }
}
