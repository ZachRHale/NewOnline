import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../services/score.service';
import { MatDialog } from '@angular/material/dialog';
import { NewMetronomeComponent } from '../new-metronome/new-metronome.component';
import { Score } from '../models/score.model';

@Component({
  selector: 'app-my-metronomes',
  templateUrl: './my-metronomes.component.html',
  styleUrls: ['./my-metronomes.component.css']
})
export class MyMetronomesComponent implements OnInit {

  constructor(private score: ScoreService, private dialog: MatDialog) { }

  ngOnInit() {
    this.score.getScoresByUser();
  }

  openNewScoreDialog() {
    const dialogRef = this.dialog.open(NewMetronomeComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed - ', result);

      var newScore: Score = {
        title: result.title,
        composer: result.composer_id,
        create_date: null,
        creator: null,
        id: null
      }
      this.score.updateScore(newScore).subscribe(result => {
        console.log(result);
      })
    });
  }

  

}
