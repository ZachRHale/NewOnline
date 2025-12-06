import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeasureService } from '../../services/measure.service';
import { Measure } from '../../models/measures';
import { MeasureComponent } from '../../components/measure/measure.component';
import { ScoreService } from '../../services/score.service';
import { Score } from '../../models/score';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  CdkDragHandle,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.css'],
  standalone: true,
  imports: [
    MeasureComponent,
    MatSliderModule,
    MatFormFieldModule,
    FormsModule,
    CdkDrag,
    CdkDropList,
    CdkDragHandle,
  ],
})
export class MetronomeComponent implements OnInit {
  @ViewChildren(MeasureComponent)
  measureComponents!: QueryList<MeasureComponent>;
  public measures: Measure[] = [];
  public score: Score | null = null;
  public tempo: number = 100;
  private currentMeasureIndex: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private measureService: MeasureService,
    private scoreService: ScoreService,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
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
      },
    });
  }

  getMeasuresForScore(scoreId: number) {
    this.measureService.getMeasuresForScore(scoreId).subscribe({
      next: (data) => {
        this.measures = data;
      },
      error: (error) => {
        console.error('Error fetching measures:', error);
      },
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.measures, event.previousIndex, event.currentIndex);
    this.measures.forEach((measure, index) => {
      measure.number = index + 1;
    });
  }

  showTimeSignature(measure: Measure): boolean {
    let measureBefore = this.measures[measure.number! - 2];
    return (
      measureBefore?.top !== measure.top ||
      measureBefore?.bottom !== measure.bottom
    );
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
