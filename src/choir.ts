import * as tone from "tone";

interface Track {
  name: string;
  audio: string;
}

interface Song {
  id: string;
  name: string;
  bpm: number;
  measure: number;
  tracks: Track[];
}

class Choir {
  constructor(private song: Song, private onState?: () => void) {
    this.load();
  }

  public players: { [name: string]: tone.Player } = {};

  public duration: number = 0;

  public get totalBars(): number {
    return Math.ceil(
      (this.duration * this.song.bpm) / 60.0 / this.song.measure
    );
  }

  public get progress(): number {
    return tone.Transport.seconds;
  }

  public get bar(): number {
    return (
      Math.floor((this.progress * this.song.bpm) / 60.0 / this.song.measure) + 1
    );
  }

  public set bar(bar: number) {
    tone.Transport.seconds =
      ((bar - 1) * this.song.measure * 60.0) / this.song.bpm;
  }

  private numLoaded = 0;

  public get loaded(): boolean {
    return this.numLoaded == this.song.tracks.length;
  }

  private progressCallbackId: number | null = null;

  public get isPlaying(): boolean {
    return tone.Transport.state == "started";
  }

  private load() {
    this.song.tracks.forEach((track) => {
      const player = new tone.Player(track.audio, () => {
        if (player.buffer.duration > this.duration) {
          this.duration = player.buffer.duration;
        }
        player.sync().start(0);
        player.toDestination();
        this.numLoaded++;
        if (this.onState) this.onState();
      });
      this.players[track.name] = player;
    });
    tone.Transport.bpm.value = this.song.bpm;
    tone.Transport.timeSignature = this.song.measure;
  }

  public play() {
    tone.start();
    if (tone.Transport.state != "started") {
      tone.Transport.start();
      this.progressCallbackId = setInterval(() => {
        if (this.onState) this.onState();
        if (tone.Transport.seconds >= this.duration) {
          this.stop();
        }
      }, 16);
    }
  }

  public pause() {
    tone.Transport.pause();
    if (this.progressCallbackId) {
      clearInterval(this.progressCallbackId);
      this.progressCallbackId = null;
    }
    if (this.onState) this.onState();
  }

  public stop() {
    tone.Transport.stop();
    if (this.progressCallbackId) {
      clearInterval(this.progressCallbackId);
      this.progressCallbackId = null;
    }
    if (this.onState) this.onState();
  }

  private volumeToDb(volume: number): number {
    return (volume - 10) * 4;
  }

  private dbToVolume(db: number): number {
    return db / 4 + 10;
  }

  public trackVolume(trackName: string): number {
    return this.dbToVolume(this.players[trackName]?.volume.value);
  }

  public setTrackVolume(trackName: string, volume: number) {
    if (this.players[trackName])
      this.players[trackName].volume.value = this.volumeToDb(volume);
  }

  public trackEnabled(trackName: string): boolean {
    return !this.players[trackName]?.mute;
  }

  public setTrackEnabled(trackName: string, enabled: boolean) {
    console.log(enabled);
    if (this.players[trackName]) this.players[trackName].mute = !enabled;
  }
}

export default Choir;
