import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './Layouts/core/core.component';
import { AllUsersComponent } from './Modules/all-users/all-users.component';
import { UserDetailsComponent } from './Modules/user-details/user-details.component';

const routes: Routes = [
  {
    path: '', component: CoreComponent,
    children: [
      { path: '', component: AllUsersComponent },
      { path: ':userName', component: UserDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
