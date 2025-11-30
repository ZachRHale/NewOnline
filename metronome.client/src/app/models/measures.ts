export class Measure {
    id?: number;
    top: number;
    bottom: number;
    tempo: number;
    beats: string;
    number?: number;
    scoreId?: number;

    constructor(top: number, bottom: number, tempo: number, beats: Array<number>) {
        this.top = top;
        this.bottom = bottom;
        this.tempo = tempo;
        this.beats = beats.join(',');
    }
}