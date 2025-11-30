import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Measure } from '../../models/measures';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetronomeWorkerService } from '../../services/metronome-worker.service';
import { MatButtonModule, MatMiniFabButton } from '@angular/material/button';


@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.css'],
  imports: [CommonModule, FormsModule, MatButtonModule, MatMiniFabButton],
  standalone: true,
})
export class MeasureComponent implements OnInit {
	@Input() public top: number = 1;
	@Input() public bottom: number = 4;
	@Input() public tempo: number = 100;
	@Input() public measureNumber: number = 1
  @Input() public audioContext: AudioContext | null = null;
	@Output() public measureUpdated: EventEmitter<Measure>;
	@Output() public giveReference: EventEmitter<MeasureComponent>;
  @Output() public playCompleted: EventEmitter<void> = new EventEmitter<void>();

	public beats: Array<number> = [];
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
			this.beats.push(_i);
		}
	}

	edit() {
		this.editing = !this.editing;
		this.setBeats();

		if (!this.editing) {
			const measure = new Measure(this.top, this.bottom, this.tempo, this.beats);
			this.measureUpdated.emit(measure);
		}
	}

	onPlayClick() {
    this.play();
	}


  play() {
    this.isPlaying = true;
    this.metronomeWorkerService.start(this.tempo, this.beats.length, this.top, this.bottom).subscribe({
      complete: () => {
        console.log('Measure play completed');
        this.isPlaying = false;
        this.playCompleted.emit();
      }
    });
  }

  stop() {
    // worker.postMessage('stop');
  }
}
