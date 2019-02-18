import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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




@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    MyMetronomesComponent,
    MetronomeComponent,
    MeasureComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'myMetronomes', component: MyMetronomesComponent, pathMatch: 'full'},
      { path: 'metronome/:id', component: MetronomeComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }