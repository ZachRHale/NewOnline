export class Measure {
  id?: number;
  top: number;
  bottom: number;
  tempo: number;
  beats: Array<{ beat: number; active: boolean }>;
  number?: number;
  scoreId?: number;

  constructor(
    top: number,
    bottom: number,
    tempo: number,
    beats: Array<{ beat: number; active: boolean }>,
  ) {
    this.top = top;
    this.bottom = bottom;
    this.tempo = tempo;
    this.beats = beats;
  }
}
