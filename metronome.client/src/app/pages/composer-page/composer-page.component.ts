import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { Composer } from '../../models/composer';
import { ComposerService } from '../../services/composer.service';
import { CreateComposerComponent } from '../../components/create-composer/create-composer.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-composer-page',
  templateUrl: './composer-page.component.html',
  styleUrls: ['./composer-page.component.css'],
  imports: [
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    RouterModule,
  ],
})
export class ComposerPageComponent implements OnInit {
  public composers: Composer[] = [];
  public isLoading: boolean = false;
  constructor(
    private composerService: ComposerService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadComposers();
  }

  viewComposer(composerId: number | undefined) {
    if (composerId) {
      this.router.navigate([`composer/${composerId}/scores`]);
    }
    // Implement navigation to composer detail page if needed
  }

  loadComposers() {
    this.isLoading = true;
    this.composerService.getComposers().subscribe({
      next: (data) => {
        this.composers = data;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  openCreateComposerDialog() {
    let dialogRef = this.dialog.open(CreateComposerComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.composerService.createComposer(result).subscribe({
          complete: () => {
            this.loadComposers();
          },
        });
      }
    });
  }

  editComposer(composer: Composer) {
    let dialogRef = this.dialog.open(CreateComposerComponent, {
      height: '400px',
      width: '600px',
      data: composer,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.composerService.updateComposer(result).subscribe({
          complete: () => {
            this.loadComposers();
          },
        });
      }
    });
  }
}
