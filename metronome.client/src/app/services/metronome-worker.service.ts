import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MetronomeWorkerService {
  
  public timerWorker: Worker = new Worker(new URL('../workers/metronomeworker', import.meta.url), { type: 'module' });
  // public downBeat = new Audio('../sounds/downClave.wav');
  // public otherBeat = new Audio('../sounds/regularClave1.wav');
  public downBeat: AudioBuffer | null = null;
  public otherBeat: AudioBuffer | null = null;
  public audioContext: AudioContext = new AudioContext();

  async loadSounds() {
    const downBeatResponse = await fetch('../sounds/downClave.wav');
    const downBeatArrayBuffer = await downBeatResponse.arrayBuffer();
    this.downBeat = await this.audioContext.decodeAudioData(downBeatArrayBuffer); 

    const otherBeatResponse = await fetch('../sounds/regularClave1.wav');
    const otherBeatArrayBuffer = await otherBeatResponse.arrayBuffer();
    this.otherBeat = await this.audioContext.decodeAudioData(otherBeatArrayBuffer);
  }

  constructor() {
    this.loadSounds();
  }

  start(tempo: number, beats: number, top: number, bottom: number): Observable<number> {
    return new Observable<number>(observer => {
      this.timerWorker.postMessage({ type: 'start', tempo: tempo, beats: beats, bottom: bottom, top: top });
      this.timerWorker.onmessage = ({ data }) => {
        if (data.type === 'tick') {
          // Update UI, e.g., show tick
          this.playSound(data.count);
          observer.next(data.count);
        }
        if (data.type === 'done') {
          // Handle completion
          observer.complete();
          console.log('Done');
        }
      };

    });
  }

  private playSound(beat: number): AudioBufferSourceNode | null {
    var source = this.audioContext.createBufferSource();
    if (beat == 0 && this.downBeat) {
      source.buffer = this.downBeat;
    } else {
      source.buffer = this.otherBeat;
    }
    source.connect(this.audioContext.destination);
    source.start(0, 0, 0.05);
    return source;
  }
}
