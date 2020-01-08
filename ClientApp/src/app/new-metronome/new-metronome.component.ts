import { Component, OnInit } from '@angular/core';
import { ComposerService } from '../services/composer.service';
import { Composer } from '../models/composer.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-metronome',
  templateUrl: './new-metronome.component.html',
  styleUrls: ['./new-metronome.component.css']
})
export class NewMetronomeComponent implements OnInit {

  public composers: Array<Composer>;

  constructor(private composer: ComposerService, public dialogRef: MatDialogRef<NewMetronomeComponent>) { }

  ngOnInit() {

    this.composer.getAllComposers().subscribe(composers => {
      this.composers = composers;
    })
  }

  createNewScore(composer_id: string, title: string) {
    this.dialogRef.close({ composer_id: composer_id, title: title })
  }

}
