const clientID = '1abca62c12d741f8bb7d35f625692f26';
const redirectURI = 'https://at-jammming.surge.sh';

let accessToken;
let expiresIn;

const Spotify = {
  getAccessToken() {
    const scope = 'playlist-modify-public';
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

  savePlaylist(name, trackURIs) {
   this.getAccessToken();

   const headers = { Authorization: `Bearer ${accessToken}` };
   let userID;

   if(name && trackURIs){
     return fetch('https://api.spotify.com/v1/me', {headers: headers}
       ).then(response => response.json()
       ).then(jsonResponse => {
         userID = jsonResponse.id;
         return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
           headers: headers,
           method: 'POST',
           body: JSON.stringify({name: name})
         }).then(response => response.json()
         ).then(jsonResponse => {
           const playlistID = jsonResponse.id;
           return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
             headers: headers,
             method: 'POST',
             body: JSON.stringify({uris: trackURIs})
           });
       });
     });
   } else {
     return;
   }
 }
};

export default Spotify;
