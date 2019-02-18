import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { Measure } from '../models/measure.model';
import { ScoreService } from '../score.service';

@Component({
	selector: 'app-metronome',
	templateUrl: './metronome.component.html',
	styleUrls: [ './metronome.component.css' ]
})
export class MetronomeComponent implements OnInit {

	public measureOptions: Array<Measure> = [
		new Measure(4, 8),
		new Measure(12, 16)
	];

	public currentScore: Array<Measure> = [
		new Measure(3, 4)
	];

	private subscription: Subscription;
	private id: string;
	public playing: boolean = false;
	public title: string;


	constructor(private activeRoute: ActivatedRoute, private scoreService: ScoreService) {}

	ngOnInit() {
		this.subscription = this.activeRoute.params.subscribe((params) => {
			this.id = params.id;
		});

		this.scoreService.getScore(this.id).subscribe((score) => {
			this.id = score.id;
			this.title = score.title;
		})
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	updateOptions(newItem, oldItem) {
		this.measureOptions.forEach((item) => {
			if (item === oldItem) {
				item.top = newItem.top;
				item.bottom = newItem.bottom;
				item.tempo = newItem.tempo;
				item.beats = newItem.beats;
			}
		})
	}

	updateScore(newItem, oldItem) {
		this.currentScore.forEach((item) => {
			if (item === oldItem) {
				item.top = newItem.top;
				item.bottom = newItem.bottom;
				item.tempo = newItem.tempo;
				item.beats = newItem.beats;
			}
		})
	}

	printScore() {
		console.log(this.currentScore)
	}

	playAll(input: number) {
		this.playing = true;
		this.currentScore[input].componentReference.play(input).then(this.callback);
	}

	callback = (result) => {
		if (result < this.currentScore.length) {
			this.playAll(result)
		} else {
			this.playing = false;
		}
	}

	drag(event: CdkDragDrop<Measure[]>) {
	
		console.log('event', event.item)
	}

	drop(event: CdkDragDrop<Measure[]>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			// Do this so that we don't reference the old object anymore
			const previousCopy = [];
			event.previousContainer.data.forEach((measure) => {
				let aMeasure = new Measure(measure.top, measure.bottom)
				aMeasure.beats = measure.beats;
				aMeasure.tempo = measure.tempo;

				previousCopy.push(aMeasure)
			})
			copyArrayItem(
				previousCopy,
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		}
	}
}
