import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './Layouts/core/core.module';
import { AllUsersComponent } from './Modules/all-users/all-users.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './Modules/user-details/user-details.component';
import { AgmCoreModule } from '@agm/core';
import { AboutComponent } from './Modules/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    AllUsersComponent,
    UserDetailsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAxBhdKsJJt5-iiMVWvPhB3p-P_8l3pMUo' // get your api key from google
    }),
    MatCardModule,
    MatSortModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
