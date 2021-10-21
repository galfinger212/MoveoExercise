import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpService } from 'src/app/Services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSort, Sort } from '@angular/material/sort';

export interface UserData {
  Image: string;
  FullName: string;
  Email: string;
  Gender: string;
  Age: number;
  Location: { lng: number, lat: number };
}

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})

export class AllUsersComponent implements AfterViewInit {
  sortedUsers!: UserData[];
  users: UserData[] = [];
  displayedColumns: string[] = ['Image', 'Full Name', 'Email', 'Age', 'Gender'];
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource<UserData>();
  pageNumber: number = 1;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private httpService: HttpService) {
    this.pageNumber = this.router.getCurrentNavigation()?.extras.state?.pageNumber;
    if (this.pageNumber === undefined) {
      this.pageNumber = 1;
    }
  }

  //init the users list
  ngAfterViewInit(): void {
    this.httpService.getPage(this.pageNumber).subscribe(allUsers => {
      for (let index = 0; index < allUsers.results.length; index++) {
        const userData = this.CreateUserData(allUsers.results[index]);
        this.users.push(userData);
      }
      this.sortedUsers = this.users.slice();
      this.dataSource = new MatTableDataSource(this.users);
    },
      (error: HttpErrorResponse) => {
        console.log(error);
      })
  }

  //return new user of type UserData
  CreateUserData(user: any) {
    return {
      Image: user.picture.medium,
      FullName: `${user.name.first + " " + user.name.last}`,
      Email: user.email,
      Gender: user.gender,
      Age: user.dob.age,
      Location: user.location
    };
  }

  //move to next page
  nextPage() {
    this.setPage(this.pageNumber + 1);
    this.pageNumber = this.pageNumber + 1;
  }

  //move to previous page
  previousPage() {
    this.setPage(this.pageNumber - 1);
    this.pageNumber = this.pageNumber - 1;
  }

  //Checks if the user has not clicked on the email sending link.
  //If not, go to the user information page.
  displayUser(user: any, event: any) {
    var mailRef = document.getElementById(user.Email)
    if (mailRef !== event.target) {
      this.router.navigate([user.FullName], { state: { user: user, pageNumber: this.pageNumber } });
    }
  }

  //Gets a page number
  //If it exists in the API, it updates it in the users list.
  setPage(numOfPage: number) {
    this.httpService.getPage(numOfPage).subscribe(allUsers => {
      this.users = [];
      for (let index = 0; index < allUsers.results.length; index++) {
        const userData = this.CreateUserData(allUsers.results[index]);
        this.users.push(userData)
      }
      this.dataSource = new MatTableDataSource(this.users);
      const sortState: Sort = { active: '', direction: '' };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
    },
      (error: HttpErrorResponse) => {
        console.log(error);
      })
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {//Back to normal
      this.sortedUsers = this.users.slice();
    }
    else {
      this.sortedUsers = this.users.slice().sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'FullName': return compare(a.FullName, b.FullName, isAsc);
          case 'Age': return compare(a.Age, b.Age, isAsc);
          case 'Email': return compare(a.Email, b.Email, isAsc);
          default: return 0;
        }
      });
    }
    this.dataSource = new MatTableDataSource(this.sortedUsers);
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

