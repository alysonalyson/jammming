import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [{name:'name', artist:'artist', album:'album', id:'id'}] },
                 { playlistName: 'Spring Faves'},
                 { playlistTracks : [
                   {name: 'name', artist:'artist', album: 'album', id:'id'},
                   {name:'name', artist:'artist', album:'album', id:'id'},
                   {name:'name', artist:'artist', album:'album', id:'id'},
                 ]}
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      let playlist = this.state.playListTracks;
      playlist.push(track);
      this.setState({playListTracks: playlist});
    }
  }

  removeTrack(track) {
    let playlist = this.state.playListTracks;
    let newPlaylist = playlist.filter(savedTrack => savedTrack.id === track.id);
    this.setState({playListTracks: newPlaylist});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    let trackURIs= this.state.playListTracks.map(track => track.uri);
    let playlistName = this.state.playlistName;
    Spotify.savePlaylist(playlistName, trackURIs);
    this.setState ({
      playlistName: 'New Playlist',
      playListTracks: []
    })
  }

  searh(term) {
    console.log(term);
    Spotify.search(term).then(tracks => {
      this.setState({searchResults: tracks});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

/*   {name:'Edge of Town', artist:'Middle Kids', album:'Edge of Town', id:'y'},
   {name:'Pynk', artist:'Janelle Monae', album:'Dirty Computer', id:'y'},
   {name:'Young Lover', artist:'St. Vincent', album:'MASSEDUCTION', id:'y'},*/
