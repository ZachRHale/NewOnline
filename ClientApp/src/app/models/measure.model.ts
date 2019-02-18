import { MeasureComponent } from '../measure/measure.component';

export class Measure {
    public top: number
    public bottom: number
    public tempo: number
    public beats: Array<number>
    public componentReference: MeasureComponent

    constructor(top: number, bottom: number, tempo: number = 80, beats: Array<number> = []) {
        this.top = top;
        this.bottom = bottom;
        this.tempo = tempo;
        this.beats = beats;
    }
}