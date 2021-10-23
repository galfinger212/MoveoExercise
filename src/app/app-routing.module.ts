import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './Layouts/core/core.component';
import { AboutComponent } from './Modules/about/about.component';
import { AllUsersComponent } from './Modules/all-users/all-users.component';
import { UserDetailsComponent } from './Modules/user-details/user-details.component';

const routes: Routes = [
  {
    path: '', component: CoreComponent,
    children: [
      { path: 'about', component: AboutComponent },
      { path: ':userName', component: UserDetailsComponent },
      { path: '', component: AllUsersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
