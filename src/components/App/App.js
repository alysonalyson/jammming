import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks : []
    };
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
      let tracks = this.state.playlistTracks;
      tracks.push(track);
      this.setState( {playlistTracks: tracks} );
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    const filteredTracks = tracks.filter(savedTrack => track.id !== savedTrack.id);
    this.setState( {playListTracks: filteredTracks} ) ;
  }

  updatePlaylistName(name) {
    this.setState( {playlistName: name} );
  }

  savePlaylist() {
    let trackURIs= this.state.playlistTracks.map(track => track.uri);
    let playlistName = this.state.playlistName;
    Spotify.savePlaylist(playlistName, trackURIs);
    this.setState ( {
      playlistName: 'New Playlist',
      playlistTracks: []
    } )
  }

  search(term) {
    Spotify.search(term).then(tracks => {
      this.setState( {searchResults: tracks} );
    });
  }

  render() {
    Spotify.getAccessToken();
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
          <SearchResults
            searchResults={this.state.searchResults}
            onAdd={this.addTrack} />
          <Playlist
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
