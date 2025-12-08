import { Component, inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Composer } from '../../models/composer';

@Component({
  selector: 'app-create-composer',
  templateUrl: './create-composer.component.html',
  styleUrls: ['./create-composer.component.css'],
    imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class CreateComposerComponent {
  readonly data = inject<Composer>(MAT_DIALOG_DATA);
  composerCopy: Composer;

  constructor(private dialogRef: MatDialogRef<CreateComposerComponent>) {
    // Create a shallow copy to avoid mutating the original data
    this.composerCopy = { ...this.data };
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ok(): void {
    this.dialogRef.close(this.composerCopy);
  }
}
