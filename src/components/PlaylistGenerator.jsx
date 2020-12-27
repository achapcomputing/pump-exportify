import '../App.scss'
import '../index.scss'

import React, { useEffect, useState, createRef, Component } from 'react';
import { Button, Container, Row, Col, Spinner, Popover, OverlayTrigger, InputGroup, FormControl, Accordion, Card } from "react-bootstrap"
import SpotifyWebApi from 'spotify-web-api-js';

import Slider from './Slider.js'
import PlaylistName from './PlaylistName.js'

const spotifyApi = new SpotifyWebApi();

export default class PlaylistGenerator extends Component {

  constructor() {
    super();
    this.state = {
      energyValue: 7,
      danceValue: 5,
      tempoValue: 120,
      playlistName: 'Pumpify Playlist'
    }
    this.updateFilterValue = this.updateFilterValue.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  updateFilterValue(cat, val) {
    this.setState({
      [cat + 'Value']: val
    })
  }

  updatePlaylistName(val) {
    this.setState({
      playlistName: val
    })
  }

  render() {
    return (
      <div>

        <Container fluid>
          <Slider 
            filterCategory='energy' 
            updateFilterValue={this.updateFilterValue}
            min='0'
            max='10'
            initialValue='7' />
          <Slider 
            filterCategory='dance' 
            updateFilterValue={this.updateFilterValue}
            min='0'
            max='10'
            initialValue='5' />
          <Slider 
            filterCategory='tempo'
            updateFilterValue={this.updateFilterValue}
            min='50'
            max='200'
            initialValue='120' />

          <PlaylistName 
            name={this.updatePlaylistName}
            defaultName='Pumpify Playlist' 
            updatePlaylistName={this.updatePlaylistName} />

        </Container>
        
      </div>
    )
  }
}


// const PlaylistGenerator = () => {
    

//     const energyFilter = 0.7;
//     const danceabilityFilter = 0.5;
//     const tempoFilter = 120;
//     const defaultPlaylistName = "Pumpify Playlist"

//     const [ energyValue, setEnergyValue ] = useState(energyFilter * 10); // sliders only use whole values, energy is a decimal
//     const [ danceValue, setDanceValue ] = useState(danceabilityFilter * 10);
//     const [ tempoValue, setTempoValue ] = useState(tempoFilter);

//     const [ playlistLinkId, setPlaylistLinkId ] = useState(playlistId);
//     const [ playlistCreated, setPlaylistCreated ] = useState(false);
//     const [ playlistLoading, setPlaylistLoading ] = useState(false);
//     const [ savedTracksLoading, setSavedTracksLoading ] = useState(true);
//     const [ playlistLength, setPlaylistLength ] = useState(0);
//     const [ playlistName, setPlaylistName ] = useState(defaultPlaylistName);
//     const [ filterError, setFilterError ] = useState(false);
//     const [ userId, setUserId ] = useState("");
//     const [ savedTracks, setSavedTracks ] = useState([]);
//     const playlistNameInputRef = createRef();

//     // var userId = "";
//     var playlistId = "";
//     var totalSaved = 3000;
//     // var savedTracks = [];
//     var loadedTracks = false;
//     var filteredUris = [];

//     useEffect(() => {
//         getMyUserId();
//         getMySavedTracks()
//         .then(() => {
//             console.log("Logged in user: " + userId);
//             console.log("only do on load!");
//             setSavedTracksLoading(false);
//         })
//     }, []);

//     function getHashParams() {
//         var hashParams = {};
//         var e, r = /([^&;=]+)=?([^&;]*)/g,
//           q = window.location.hash.substring(1);
//         e = r.exec(q)
//         while (e) {
//           hashParams[e[1]] = decodeURIComponent(e[2]);
//           e = r.exec(q);
//         }
//         return hashParams;
//       }
    
//     function setUserToken() {
//         const params = getHashParams();
//         const token = params.access_token;
//         if (token) {
//           spotifyApi.setAccessToken(token);
//         }
//     }
    
//     function getMyUserId() {
//         setUserToken();
//         spotifyApi.getMe()
//             .then((response) => {
//                 setUserId(response.id);
//             })
//             .catch((err) => {
//                 console.error(err);
//             })
//     }

//     async function getMySavedTracks() {
//         console.log("GETTING LIKED SONGS");
//         const offset = 50;
//         for (var i = 0; i < 1500; i += offset) {
//           await spotifyApi.getMySavedTracks({ limit: offset, offset: i })
//             .then((response) => {
//               totalSaved = response.total
//               getTrackAudioFeatures(response.items);
//               console.log(i);
//             })
//             .catch((err) => {
//               console.error(err);
//               console.error("ERROR: Error getting saved tracks");
//             })
//         }
//         loadedTracks = true;
//     }

//     function getTrackAudioFeatures(tracks) {
//         const ids = [];
//         tracks.forEach(t => {
//           ids.push(t.track.id);
//         })
//         spotifyApi.getAudioFeaturesForTracks(ids)
//             .then((response) => {
//                 var i = 0;
//                 response.audio_features.forEach(t => {
//                     savedTracks.push({
//                         id: t.id,
//                         uri: t.uri,
//                         name: tracks[i++].track.name,
//                         energy: t.energy,
//                         danceability: t.danceability,
//                         tempo: t.tempo
//                     })
//                 })
//             })
//             .catch((err) => {
//                 console.error(err);
//                 console.error("Error getting audio features for tracks")
//         })
//     }

//     function filterTracks() {
//         const filtered = [];
//         savedTracks.forEach(t => {
//             if (t.energy >= (energyValue / 10.0) && t.danceability >= (danceValue / 10.0) && t.tempo >= tempoValue) {
//                 filtered.push(t.uri);
//             }
//         });
//         filteredUris = filtered;
//         console.log(filteredUris);
//     }

//     async function createPlaylist() {
//         await spotifyApi.createPlaylist(userId, 
//         { 
//             name: playlistName,
//             description: `Liked Songs filtered by Energy: ${energyValue / 10.0}, Danceability: ${danceValue / 10.0}, and Tempo: ${tempoValue}. Created with https://achapcomputing.github.io/pumpify/`,
//             public: true
//         })
//         .then((response) => {
//             console.log("MAKING PLAYLIST! " + response.id);
//             playlistId = response.id
//         })
//         .catch((err) => {
//             console.error(err);
//             console.error("ERROR: Error creating playlist");
//         })
//     }

//     async function addTracksToPlaylist() {
//         const offset = 100;
//         for (var i = 0; i < filteredUris.length; i += offset) {
//             const uris = filteredUris.slice(i, i + offset);
//             await spotifyApi.addTracksToPlaylist(playlistId, uris)
//             .catch((err) => {
//                 console.error(err);
//                 console.error("ERROR: Error adding workout tracks to playlist")
//             })
//         }
//     }
    
//     async function generatePlaylist() {
//         setPlaylistLoading(true);
//         setPlaylistCreated(false);
//         setFilterError(false);
        
//         if (savedTracks.length > 0 && filteredUris.length > 0 && !savedTracksLoading) {
//                     // filter saved songs
//         filterTracks();
//             // create new playlist
//             await createPlaylist();
//             // add songs to playlist
//             await addTracksToPlaylist();

//             if (playlistId !== "") {
//                 setPlaylistLinkId(playlistId);
//             }
//             if (filteredUris.length > 0) {
//                 setPlaylistLoading(false);
//                 setPlaylistCreated(true);
//                 setPlaylistLength(filteredUris.length);
//             } else {
//                 setFilterError(true);
//                 setPlaylistLoading(false);
//             }
//         // } else {
//         //     setFilterError(true);
//         }   
        
//     }

//     updateEnergy() {

//     }

//     return (
//         <div>
//             

//             <Container className="Generate">
//                 <Row>
//                     <Button id="createButton" variant="outline-primary" onClick={() => generatePlaylist()} disabled={playlistLoading}>Generate Playlist</Button>
//                 </Row>
//                 <Row className="center">
//                     {
//                         playlistLoading &&
//                         <Spinner animation="grow" variant='primary' />
//                     }
//                     {
//                         playlistCreated && playlistLinkId && !savedTracksLoading &&
//                         <div>
//                             <p className="lead text-secondary">
//                                 <a href={`https://open.spotify.com/playlist/${playlistLinkId}`} target="_blank">Playlist Created!</a>
//                             </p>
//                             <p className="text-secondary">
//                                 {playlistLength} Songs Added
//                             </p>                            
//                         </div>
//                     }
//                     {
//                         filterError && !savedTracksLoading &&
//                         <div>
//                             <p className="lead text-secondary">
//                                 Cannot create playlist because you do not have any songs in your Liked Songs
//                                 Library that meets the given filter criteria.
//                             </p>                            
//                         </div>
//                     }
//                 </Row>
//             </Container>

//         </div>
//     )
// };



// export default PlaylistGenerator;