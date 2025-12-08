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
  @Input() public measure: Measure = new Measure(4, 4, 100, []);
  @Input() public tempo: number = 100;
  @Input() public showTimeSignature: boolean = true;
  @Input() public audioContext: AudioContext | null = null;
  @Output() public playCompleted: EventEmitter<void> = new EventEmitter<void>();

  public beats: Array<{ beat: number; active: boolean }> = [];
  public editing: boolean = false;
  public isPlaying: boolean = false;

  constructor(private metronomeWorkerService: MetronomeWorkerService) {}

  ngOnInit() {
    this.setBeats();
  }

  setBeats() {
    this.beats = [];
    for (var _i = 1; _i < this.measure.top + 1; _i++) {
      this.beats.push({ beat: _i, active: false });
    }
  }

  edit() {
    this.editing = !this.editing;
    this.setBeats();
  }

  onPlayClick() {
    this.play();
  }

  play() {
    this.isPlaying = true;
    this.metronomeWorkerService
      .start(
        this.tempo,
        this.beats.length,
        this.measure.top,
        this.measure.bottom,
      )
      .subscribe({
        next: (msg: number) => {
          this.beats.forEach((beat, index) => {
            beat.active = index === msg;
          });
        },
        complete: () => {
          this.beats.forEach((beat, index) => {
            beat.active = false;
          });
          this.isPlaying = false;
          this.playCompleted.emit();
        },
      });
  }

  stop() {
    this.metronomeWorkerService.stop();
  }
}
