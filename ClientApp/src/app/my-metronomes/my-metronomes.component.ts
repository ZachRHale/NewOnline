import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../services/score.service';

@Component({
  selector: 'app-my-metronomes',
  templateUrl: './my-metronomes.component.html',
  styleUrls: ['./my-metronomes.component.css']
})
export class MyMetronomesComponent implements OnInit {

  constructor(private score: ScoreService) { }

  ngOnInit() {
    this.score.getScoresByUser();
  }

  

}
