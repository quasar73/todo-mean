import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'client';

    iconsList: string[] = ['github', 'linkedin'];

    constructor(
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer
    ) {
        this.iconsList.forEach((iconName) => {
            this.registerIcon(iconName);
        });
    }

    registerIcon(name: string) {
        this.iconRegistry.addSvgIcon(
            name,
            this.sanitizer.bypassSecurityTrustResourceUrl(
                `../assets/images/svg/${name}.svg`
            )
        );
    }
}
