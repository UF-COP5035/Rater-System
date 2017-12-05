import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Administrator } from '../administrator/administrator';
import { AdministratorService } from '../administrator/administrator.service';
import { AuthenticationService, Credentials } from '../authentication/authentication.service';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
    currentAdministrator: Promise<Administrator>;
    courses: Promise<Array<any>>;
    adminInfo: Credentials;

    constructor(
        private router: Router,
        private adminService: AdministratorService,
        private authService: AuthenticationService
    ) {
        this.adminInfo = this.authService.credentials();
    }

    ngOnInit() {
        this.currentAdministrator = this.adminService.getAdministrator(this.adminInfo.user_id);
        this.courses = this.adminService.getCoursesByAdministrator(this.adminInfo.user_id);
    }
    goToSubmitReviews(userId: string) {
        this.router.navigate(['/admin-dashboard/review/']);
    }
    goToCreateUsers(userId: string){
        this.router.navigate(['/admin-dashboard/create/']);
      }
}
