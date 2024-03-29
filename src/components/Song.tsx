import React, { Component, useState } from "react";
import Choir from "@root/choir";
import * as tone from "tone";

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
      <td className="text-center">
        <input
          className="align-middle w-5 h-5 inline-block"
          type="checkbox"
          checked={enabled}
          onChange={handleEnable}
          title="Enable Track"
        ></input>
      </td>
      <td>
        <span className="align-middle" title="Track Name">
          {track.name}
        </span>
      </td>
      <td>
        <input
          className="w-full align-middle"
          type="range"
          min="0"
          max="14"
          step="0.1"
          value={volume}
          onChange={handleVolume}
          disabled={!enabled}
          title="Track Volume"
        ></input>
      </td>
      <td className="text-center">
        <a
          href={track.audio}
          target="_blank"
          className="align-middle"
          title="Download Track"
        >
          <img src="/download.svg" className="inline-block w-6 h-6"></img>
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
    tone.start().then(() => {
      if (!this.choir.isPlaying) {
        this.choir.play();
      } else {
        this.choir.pause();
      }
    });
  }

  stop() {
    this.choir.stop();
  }

  render() {
    if (!this.state.loaded) {
      return "努力加載中...";
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
            {this.choir.isPlaying ? "暫停" : "播放"}
          </button>
          <button
            className="py-1 px-3 border border-black"
            onClick={() => {
              this.stop();
            }}
          >
            停止
          </button>
        </div>
        <div className="flex gap-1">
          <label>小節: {this.state.pos}</label>
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
          <thead>
            <tr>
              <th>開/関</th>
              <th className="text-left">音軌</th>
              <th className="text-left">音量</th>
              <th>下載</th>
            </tr>
          </thead>
          {this.song.tracks.map((track) => (
            <Track key={track.name} track={track} choir={this.choir} />
          ))}
        </table>
      </div>
    );
  }
}
