import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button'; 
import { ComposerService } from './services/composer.service';
import { Composer } from './models/composer';
import { CreateComposerComponent } from './components/create-composer/create-composer.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [MatTableModule, MatButtonModule, CreateComposerComponent, MatDialogModule, MatProgressSpinnerModule, MatIconModule],
})
export class AppComponent implements OnInit {

  public composers: Composer[] = [];
  public isLoading: boolean = false;
  constructor(private composerService: ComposerService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadComposers();
  }

  loadComposers() {
    this.isLoading = true;
    this.composerService.getComposers().subscribe({
      next: (data) => {
        this.composers = data;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  openCreateComposerDialog() {
    let dialogRef = this.dialog.open(CreateComposerComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.composerService.createComposer(result).subscribe({
          complete: () => {
            this.loadComposers();
          }
        });
      }
    });
  }

  editComposer(composer: Composer) {
    let dialogRef = this.dialog.open(CreateComposerComponent, {
      height: '400px',
      width: '600px',
      data: composer
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.composerService.updateComposer(result).subscribe({
          complete: () => {
            this.loadComposers();
          }
        });
      }
    });
  }
}
