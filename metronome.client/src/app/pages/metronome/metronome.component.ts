import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeasureService } from '../../services/measure.service';
import { Measure } from '../../models/measures';
import { MeasureComponent } from '../../components/measure/measure.component';
import { ScoreService } from '../../services/score.service';
import { Score } from '../../models/score';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.css'],
  standalone: true,
  imports: [MeasureComponent],
})
export class MetronomeComponent implements OnInit {

  @ViewChildren(MeasureComponent) measureComponents!: QueryList<MeasureComponent>;
  public measures: Measure[] = [];
  public score: Score | null = null;
  private currentMeasureIndex: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private measureService: MeasureService, private scoreService: ScoreService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.getMeasuresForScore(id);
      this.getScore(id);
    });
  }

  getScore(scoreId: number) {
    this.scoreService.getScore(scoreId).subscribe({
      next: (data) => {
        console.log('Score data:', data);
        this.score = data;  
      }
    });
  }

  getMeasuresForScore(scoreId: number) {
    this.measureService.getMeasuresForScore(scoreId).subscribe({
      next: (data) => {
        this.measures = data;
      },
      error: (error) => {
        console.error('Error fetching measures:', error);
      }
    });
  }

  playNextMeasure() {
    const measures = this.measureComponents.toArray();
    if (this.currentMeasureIndex < measures.length) {
      measures[this.currentMeasureIndex].play();
    }
  }

  onPlayCompleted(measureNumber: number) {
    this.currentMeasureIndex = measureNumber;
    this.playNextMeasure();
  }
}