import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/shared/models/user-data.model';
import { AuthenticationService } from 'src/app/shared/services/auth';

@Component({
    selector: 'todo-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
    userData!: UserData;

    get userName(): string {
        return this.userData?.userName ?? '<userName>';
    }

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.authService.getUserData().subscribe((data) => {
            this.userData = data;
        });
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/'])
    }
}
