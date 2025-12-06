import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Measure } from '../../models/measures';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetronomeWorkerService } from '../../services/metronome-worker.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSliderModule,
    MatIconModule,
  ],
  standalone: true,
})
export class MeasureComponent implements OnInit {
  @Input() public top: number = 1;
  @Output() public topChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() public bottom: number = 4;
  @Output() public bottomChange: EventEmitter<number> =
    new EventEmitter<number>();
  @Input() public tempo: number = 100;
  @Input() public measureNumber: number = 1;
  @Input() public showTimeSignature: boolean = true;
  @Input() public audioContext: AudioContext | null = null;
  @Output() public measureUpdated: EventEmitter<Measure>;
  @Output() public giveReference: EventEmitter<MeasureComponent>;
  @Output() public playCompleted: EventEmitter<void> = new EventEmitter<void>();

  public beats: Array<{ beat: number; active: boolean }> = [];
  public editing: boolean = false;
  public isPlaying: boolean = false;

  constructor(private metronomeWorkerService: MetronomeWorkerService) {
    this.measureUpdated = new EventEmitter();
    this.giveReference = new EventEmitter();
  }

  ngOnInit() {
    this.setBeats();
    this.giveReference.emit(this);
  }

  setBeats() {
    this.beats = [];
    for (var _i = 1; _i < this.top + 1; _i++) {
      this.beats.push({ beat: _i, active: false });
    }
  }

  edit() {
    this.editing = !this.editing;
    this.setBeats();

    if (!this.editing) {
      const measure = new Measure(
        this.top,
        this.bottom,
        this.tempo,
        this.beats,
      );
      this.measureUpdated.emit(measure);
    }
  }

  onPlayClick() {
    this.play();
  }

  play() {
    this.isPlaying = true;
    this.metronomeWorkerService
      .start(this.tempo, this.beats.length, this.top, this.bottom)
      .subscribe({
        next: (msg: number) => {
          console.log('Measure playing:', msg);
          this.beats.forEach((beat, index) => {
            beat.active = index === msg;
          });
        },
        complete: () => {
          console.log('Measure play completed');
          this.beats.forEach((beat, index) => {
            beat.active = false;
          });
          this.isPlaying = false;
          this.playCompleted.emit();
        },
      });
  }

  stop() {
    // worker.postMessage('stop');
  }
}
