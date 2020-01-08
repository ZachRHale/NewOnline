import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { MyMetronomesComponent } from './my-metronomes/my-metronomes.component';
import { MetronomeComponent } from './metronome/metronome.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MeasureComponent } from './measure/measure.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptService } from './helpers/jwt-intercept.service';
import { NewMetronomeComponent } from './new-metronome/new-metronome.component';





@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    MyMetronomesComponent,
    MetronomeComponent,
    MeasureComponent,
    LoginComponent,
    NewMetronomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'myMetronomes', component: MyMetronomesComponent, pathMatch: 'full'},
      { path: 'metronome/:id', component: MetronomeComponent },
      { path: 'signin', component: LoginComponent }
    ])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
