import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes, Router, ParamMap, Params } from '@angular/router';
import { Administrator } from '../administrator/administrator';
import { AdministratorService } from '../administrator/administrator.service';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  currentAdministrator: Promise<Administrator>;
  courses: Promise<Array<any>>;
  administratorID: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AdministratorService
  ) { 
    this.route.params.subscribe(params => this.administratorID = params._id);
  }

  ngOnInit() {
    this.currentAdministrator = this.service.getAdministrator(this.administratorID);
    this.courses = this.service.getCoursesByAdministrator(this.administratorID);
  }
  goToSubmitReviews(userId: string) {
    this.router.navigate(['/admin-dashboard/review/', userId]);
}}






