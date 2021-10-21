import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: any;
  lat: any;
  lng: any;

  constructor(private router: Router) {
    this.user = this.router.getCurrentNavigation()?.extras.state?.user;
    if (this.user) {
      this.lat = parseFloat(this.user.Location.coordinates.latitude);
      this.lng = parseFloat(this.user.Location.coordinates.longitude);
    } else {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
  }
}
