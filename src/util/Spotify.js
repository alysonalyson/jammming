const clientID = '1abca62c12d741f8bb7d35f625692f26';
const redirectURI = 'https://at-jammming.surge.sh';

let accessToken;
let expiresIn;

const Spotify = {
  getAccessToken() {
    let token = window.location.href.match(/access_token=([^&]*)/);
    let expiry = window.location.href.match(/expires_in=([^&]*)/);
    if(accessToken) {
      return accessToken;
    } else if (token && expiry) {
      accessToken = token[1];
      expiresIn = expiry[1];
      window.setTimeout(() => accessToken = null, expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const scope = 'user-read-private user-read-email ' +
     'playlist-modify-private playlist-read-private ' +
     'playlist-modify-public playlist-read-collaborative';
      window.location= `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}&scope=${scope}`;
    }
  },

  search(term) {
    this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(response => {
      if(response.ok){
        return response.json();
      }
      throw new Error('Request Failed');
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      if(jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      }
    });
  },

  savePlaylist(playlistName, trackURIs) {
    this.getAccessToken();

    const headers = { Authorization: `Bearer ${accessToken}`, Content_Type: 'application/json'};
    let userID;
    let playlistID;

    if(!playlistName && !trackURIs){
      return;
    } else {
      return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Request failed');
        }, networkError => console.log(networkError.message)
        ).then(jsonResponse => {
          return userID = jsonResponse.id;
        }).then(() => {
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: playlistName})
          }).then(response => {
            if(response.ok) {
              return response.json();
            }
            throw new Error('Request failed');
          }, networkError => console.log(networkError.message)
          ).then(jsonResponse => {
            playlistID =jsonResponse.id;
            return playlistID;
          });
        }).then(() => {
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({uris: trackURIs})
          }).then(response => {
            if(response.ok) {
              return response.json();
            }
            throw new Error('Request failed');
          }, networkError => console.log(networkError.message)
          ).then(jsonResponse => {
            playlistID =jsonResponse.id;
            return playlistID;
          });
        });
    }
  }
};

export default Spotify;
