import React, { Component, useState } from "react";
import Choir from "@root/choir";

function Track({ track, choir }) {
  const [enabled, setEnabled] = React.useState(choir.trackEnabled(track.name));
  const handleEnable = () => {
    setEnabled(!enabled);
    choir.setTrackEnabled(track.name, !enabled);
  };

  const [volume, setVolume] = React.useState(choir.trackVolume(track.name));
  const handleVolume = (e) => {
    setVolume(e.target.value);
    choir.setTrackVolume(track.name, e.target.value);
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={enabled}
          onChange={handleEnable}
        ></input>
      </td>
      <td>{track.name}</td>
      <td>
        <input
          className="w-full"
          type="range"
          min="0"
          max="12"
          value={volume}
          onChange={handleVolume}
          disabled={!enabled}
        ></input>
      </td>
      <td>
        <a href={track.audio} target="_blank">
          <img src="/download.png"></img>
        </a>
      </td>
    </tr>
  );
}

export default class Song extends Component {
  constructor(props) {
    super(props);
    this.song = props.song;
  }

  componentDidMount() {
    this.choir = new Choir(this.song, () => {
      this.onState();
    });
  }

  song = null;

  choir = null;

  state = {
    loaded: false,
    pos: 0,
  };

  onState() {
    this.setState({
      loaded: this.choir.loaded,
      pos: this.choir.bar,
    });
  }

  togglePlay() {
    if (!this.choir.isPlaying) {
      this.choir.play();
    } else {
      this.choir.pause();
    }
  }

  stop() {
    this.choir.stop();
  }

  render() {
    if (!this.state.loaded) {
      return "Loading...";
    }
    return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <button
            className="py-1 px-3 border border-black"
            onClick={() => {
              this.togglePlay();
            }}
          >
            {this.choir.isPlaying ? "Pause" : "Play"}
          </button>
          <button
            className="py-1 px-3 border border-black"
            onClick={() => {
              this.stop();
            }}
          >
            Stop
          </button>
        </div>
        <div className="flex gap-1">
          <label>Measure: {this.state.pos}</label>
          <input
            className="grow"
            type="range"
            value={this.state.pos}
            min="1"
            max={this.choir.totalBars}
            onInput={(e) => {
              this.choir.bar = e.target.value;
              this.onState();
            }}
          ></input>
        </div>
        <table className="border-separate border-spacing-y-5">
          {this.song.tracks.map((track) => (
            <Track key={track.name} track={track} choir={this.choir} />
          ))}
        </table>
      </div>
    );
  }
}
