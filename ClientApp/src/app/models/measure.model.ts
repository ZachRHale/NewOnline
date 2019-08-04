import { MeasureComponent } from '../measure/measure.component';

export class Measure {
    public id?: string;
    public top: number;
    public bottom: number;
    public tempo: number;
    public beats: Array<number>;
    public score: string;
    public measureNumber: number;
    public componentReference: MeasureComponent;

    constructor(top: number, bottom: number, tempo: number = 80, beats: Array<number> = []) {
        this.top = top;
        this.bottom = bottom;
        this.tempo = tempo;
        this.beats = beats;
    }
}

export function returnMeasureDBFromMeasure(measures: Measure[]): MeasureDatabaseModel[]{
    const newArray: MeasureDatabaseModel[] = [];
    
    measures.forEach(measure => {
        const newObj: MeasureDatabaseModel = {
            id: measure.id,
            score: measure.score,
            beats: JSON.stringify(measure.beats), 
            top: measure.top,
            bottom: measure.bottom,
            tempo: measure.tempo,
            measureNumber: measure.measureNumber
        }

        newArray.push(newObj);
    });

    return newArray;
}

export interface MeasureDatabaseModel {
    id?: string;
    top: number;
    bottom: number;
    tempo: number;
    /** JSON stringy of an array. Need to make normalized table in DB for this */
    beats: string;
    score: string;
    measureNumber: number;

}