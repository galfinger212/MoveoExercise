import { Component, HostListener, OnInit } from '@angular/core';
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
  pageNumber?: number;

  constructor(private router: Router) {
    this.user = this.router.getCurrentNavigation()?.extras.state?.user;
    this.pageNumber = this.router.getCurrentNavigation()?.extras.state?.pageNumber;
    if (this.user) {
      this.lat = parseFloat(this.user.Location.coordinates.latitude);
      this.lng = parseFloat(this.user.Location.coordinates.longitude);
    } else {//when refresh go back to homePage
      this.router.navigate(['']);
    }
  }

  //ask the user if want to reload the site
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    event.returnValue = false;
  }

  //return to homePage to the previous page number
  BackToUsersList() {
    this.router.navigate([''], { state: { pageNumber: this.pageNumber } });
  }
  ngOnInit(): void {
  }
}
