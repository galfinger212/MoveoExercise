import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpService } from 'src/app/Services/http.service';
import { HttpErrorResponse } from '@angular/common/http';

export interface UserData {
  Image: string;
  FullName: string;
  Email: string;
  Gender: string;
  Age: number;
  location: { lng: number, lat: number };
}

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements AfterViewInit {
  users: UserData[] = [];
  displayedColumns: string[] = ['Image', 'Full Name', 'Email', 'Gender', 'Age'];
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource<UserData>();
  pageNumber: number = 1;
  constructor(private router: Router, private httpService: HttpService) { }


  ngAfterViewInit(): void {
    this.httpService.getPage(this.pageNumber).subscribe(allUsers => {
      for (let index = 0; index < allUsers.results.length; index++) {
        const user = allUsers.results[index];
        this.users.push(user)
      }
      this.dataSource = new MatTableDataSource(this.users);
    },
      (error: HttpErrorResponse) => {
        console.log(error);
      })
  }
  nextPage() {
    this.setPage(this.pageNumber + 1);
    this.pageNumber = this.pageNumber + 1;
  }
  previousPage() {
    this.setPage(this.pageNumber - 1);
    this.pageNumber = this.pageNumber - 1;
  }
  displayUser(user: any, event: any) {
    var mail = document.getElementById("mail")
    if (mail !== event.target) {
      this.router.navigate([user.name.first + user.name.last], { state: { user: user } });
    }
  }

  setPage(numOfPage: number) {
    this.httpService.getPage(numOfPage).subscribe(allUsers => {
      console.log(allUsers.results);
      this.users = [];
      for (let index = 0; index < allUsers.results.length; index++) {
        const user = allUsers.results[index];
        this.users.push(user)
      }
      this.dataSource = new MatTableDataSource(this.users);
    },
      (error: HttpErrorResponse) => {
        console.log(error);
      })
  }
}


