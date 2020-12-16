import React from "react"
import { Button } from "react-bootstrap"
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

class PumpPlaylistGenerator extends React.Component {

  workoutTracks = [];
  energyFilter = 0.7;
  danceabilityFilter = 0.5;
  tempoFilter = 120;
  callbackVal = 0;

  state = {
    userId: "",
    initialized: false,
    savedTracks: [],
    filteredUris: [],
    playlistId: "",
    savedSongs: {
      limit: 0,
      count: 0
    },
    progressBar: {
      show: false,
      label: "",
      value: 0
    }
  }

  constructor(props) {
    super(props)
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  async getMyUserId() {
    await spotifyApi.getMe()
      .then((response) => {
        this.setState({
          userId: response.id
        })
      })
  }

  async getMySavedTracks() {
    const offset = 50;
    for (var i = 0; i < 2000; i += offset) {
      await spotifyApi.getMySavedTracks({ limit: offset, offset: i })
        .then((response) => {
          this.setState({
            totalSaved: response.total
          })
          this.getTrackAudioFeatures(response.items);
          console.log(response.offset);
        })
        .catch((err) => {
          console.error(err);
          console.error("ERROR: Error getting saved tracks");
        })
      }
    }
  
  getTrackAudioFeatures(tracks) {
    const ids = [];
    tracks.forEach(t => {
      ids.push(t.track.id);
    })
    spotifyApi.getAudioFeaturesForTracks(ids)
      .then((response) => {
        var i = 0;
        response.audio_features.forEach(t => {
          this.state.savedTracks.push({
            id: t.id,
            uri: t.uri,
            name: tracks[i++].track.name,
            energy: t.energy,
            danceability: t.danceability,
            tempo: t.tempo
          })
        })
        this.filterTracks();
      })
      .catch((err) => {
        console.error(err);
        console.error("Error getting audio features for tracks")
      })
  }

  filterTracks() {
    const filtered = [];
    this.state.savedTracks.forEach(t => {
      if (t.energy >= this.energyFilter && t.danceability >= this.danceabilityFilter && t.tempo >= this.tempoFilter) {
        filtered.push(t.uri);
      }
    });
    this.setState({
      filteredUris: filtered
    })
    console.log(this.state.filteredUris);
  }

  async createPlaylist() {
    await spotifyApi.createPlaylist(this.state.userId, 
    { 
      name: "API Playlist", 
      description: `Liked Songs filtered by Energy: ${this.energyFilter}, Danceability: ${this.danceabilityFilter}, and Tempo: ${this.tempoFilter}. Created with https://achapcomputing.github.io/pumpify/`,
      public: true
    })
    .then((response) => {
      console.log("MAKING PLAYLIST! " + response.id);
      this.setState({
        playlistId: response.id
      })
    })
    .catch((err) => {
      console.error(err);
      console.error("ERROR: Error creating playlist");
    })
  }

  addTracksToPlaylist() {
    const offset = 100;
    for (var i = 0; i < this.state.filteredUris.length; i += offset) {
      const uris = this.state.filteredUris.slice(i, i + offset);
      spotifyApi.addTracksToPlaylist(this.state.playlistId, uris)
      .then(() => {
        console.log("added!");
      })
      .catch((err) => {
        console.error(err);
        console.error("ERROR: Error adding workout tracks to playlist")
      })
    }
  }

  async generatePlaylist() {
    await this.getMyUserId();
    // get saved songs
    await this.getMySavedTracks()
    // filter saved songs
    // create new playlist
    await this.createPlaylist();
    // add songs to playlist
    this.addTracksToPlaylist();
    console.log("help!" + this.state.playlistId)
  }

  render() {
    return (
      <div>

        <Button onClick={() => this.generatePlaylist()}>Generate Playlist</Button>
      
      </div>
    )
  }
}

export default PumpPlaylistGenerator
