import { Component, OnInit, Input, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Measure } from '../models/measure.model';
import { MeasureService } from '../services/measure.service';

@Component({
	selector: 'app-measure',
	templateUrl: './measure.component.html',
	styleUrls: [ './measure.component.css' ]
})
export class MeasureComponent implements OnInit {
	@Input() public top: string;
	@Input() public bottom: string;
	@Input() public tempo: number = 100;
	@Input() public measureNumber: number;
	@Output() public measureUpdated: EventEmitter<Measure>;
	@Output() public giveReference: EventEmitter<MeasureComponent>;

	public beats: Array<number> = [];
	public editing: boolean = false;

	constructor() {
		this.measureUpdated = new EventEmitter();
		this.giveReference = new EventEmitter();
	}

	ngOnInit() {
		this.setBeats();
		this.giveReference.emit(this);
	}

	setBeats() {
		this.beats = [];
		for (var _i = 1; _i < parseInt(this.top) + 1; _i++) {
			this.beats.push(_i);
		}
	}

	edit() {
		this.editing = !this.editing;
		this.setBeats();

		if (!this.editing) {
			const measure = new Measure(parseInt(this.top), parseInt(this.bottom), this.tempo, this.beats);
			this.measureUpdated.emit(measure);
		}
	}

	onPlayClick() {
		this.play(0).then((stuff) => {
			console.log(stuff);
		});
	}

	play(input: number): Promise<number> {
		var counter = 1;
		var beats = this.beats.length;
		var tempo = this.tempo;
		var bottom = this.bottom;
		var playSound = this.playSound;

		return new Promise((resolve) => {
			var looper = function() {
				if (counter < beats + 1) {
					console.log(counter);
					playSound(counter);
					counter = counter + 1;
				} else {
					console.log('Loop end');
					//Make this point to the next measure in line
					resolve(input + 1);
					return 1;
				}

				setTimeout(looper, 60 / tempo * 1000 * 4 / parseInt(bottom));
			};
			looper();
		});
	}

	playSound(beat: number): void {
		var downBeat = new Audio('../assets/sounds/downClave.wav');
		var otherBeat = new Audio('../assets/sounds/regularClave1.wav');
		if (beat == 1) {
			downBeat.play();
		} else {
			otherBeat.play();
		}
	}
}
