import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthenticationService } from './authentication/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: []
})
export class AppComponent implements OnInit {

    constructor(
        title: Title,
        private authService: AuthenticationService,
        private router: Router,
    ) {
        title.setTitle('Gator Grader');
    }

    ngOnInit(): void { }

    logout() {
        this.authService.logout();
        this.router.navigate(['/']);
    }
}
