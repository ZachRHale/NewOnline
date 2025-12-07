import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeasureService } from '../../services/measure.service';
import { Measure } from '../../models/measures';
import { MeasureComponent } from '../../components/measure/measure.component';
import { ScoreService } from '../../services/score.service';
import { Score } from '../../models/score';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  CdkDragHandle,
} from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule,
  ],
})
export class MetronomeComponent implements OnInit {
  @ViewChildren(MeasureComponent)
  measureComponents!: QueryList<MeasureComponent>;
  @ViewChildren('measureEl', { read: ElementRef })
  measureElements!: QueryList<ElementRef>;
  public measures: Measure[] = [];
  public score: Score | null = null;
  public tempo: number = 100;
  private currentMeasureIndex: number = 0;

  public startMeasureNumber: number = 1;
  public currentMeasureNumber: number = 1;
  public stopMeasureNumber: number = 1;
  public isPlaying: boolean = false;

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
        this.score = data;
      },
    });
  }

  getMeasuresForScore(scoreId: number) {
    this.measureService.getMeasuresForScore(scoreId).subscribe({
      next: (data) => {
        this.measures = data;
        this.stopMeasureNumber = this.measures.length;
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

  addMeasure() {
    const newMeasureNumber = this.measures.length + 1;
    const newMeasure: Measure = {
      number: newMeasureNumber,
      top: 4,
      bottom: 4,
      beats: [],
      tempo: this.tempo,
    };
    this.measures.push(newMeasure);
  }

  play() {
    this.isPlaying = true;
    this.currentMeasureIndex = 0;
    this.currentMeasureNumber = 1;
    this.playNextMeasure();
  }

  playFromMeasure(measureNumber: number) {
    this.isPlaying = true;
    this.currentMeasureIndex = measureNumber - 1;
    this.playNextMeasure();
  }

  stop() {
    const measures = this.measureComponents.toArray();
    measures[this.currentMeasureIndex].stop();
    this.isPlaying = false;
  }

  playNextMeasure() {
    this.currentMeasureNumber = this.currentMeasureIndex + 1;
    if (this.currentMeasureNumber > this.stopMeasureNumber) {
      this.isPlaying = false;
      return;
    }
    const measures = this.measureComponents.toArray();
    if (this.currentMeasureIndex < measures.length) {
      this.scrollToMeasure(this.currentMeasureIndex);
      measures[this.currentMeasureIndex].play();
    } else {
      this.isPlaying = false;
    }
  }

  private scrollToMeasure(index: number) {
    const el = this.measureElements.toArray()[index]?.nativeElement;
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }

  onPlayCompleted(measureNumber: number) {
    if (this.isPlaying) {
      this.currentMeasureIndex = measureNumber;
      this.playNextMeasure();
    }
  }
}
