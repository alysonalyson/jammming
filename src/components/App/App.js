import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [{name:'', artist:'', album:'', id:''}] },
                 { playlistName: 'Spring Faves'},
                 { playlistTracks : [
                   {name:'Edge of Town', artist:'Middle Kids', album:'Edge of Town', id:'y'},
                   {name:'Pynk', artist:'Janelle Monae', album:'Dirty Computer', id:'y'},
                   {name:'Young Lover', artist:'St. Vincent', album:'MASSEDUCTION', id:'y'},
                 ]}
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      return this.state.playListTracks.push(track);
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
