import '../App.scss'
import '../index.scss'

import React, { useState } from 'react';
import { Button, Container, Row, Col, Spinner } from "react-bootstrap"
import RangeSlider from 'react-bootstrap-range-slider';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const PlaylistGenerator = () => {

    const energyFilter = 0.7;
    const danceabilityFilter = 0.5;
    const tempoFilter = 120;

    const [ energyValue, setEnergyValue ] = useState(energyFilter * 10);
    const [ danceValue, setDanceValue ] = useState(danceabilityFilter * 10);
    const [ tempoValue, setTempoValue ] = useState(tempoFilter);
    const [ playlistLinkId, setPlaylistLinkId ] = useState(playlistId);
    const [ playlistCreated, setPlaylistCreated ] = useState(false);
    const [ playlistLoading, setPlaylistLoading ] = useState(false);
    const [ playlistLength, setPlaylistLength ] = useState(0);

    var userId = "";
    var playlistId = "";
    var totalSaved = 3000;
    var savedTracks = [];
    var filteredUris = [];

    function getHashParams() {
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
    
    function setUserToken() {
        const params = getHashParams();
        const token = params.access_token;
        if (token) {
          spotifyApi.setAccessToken(token);
        }
    }
    
    function getMyUserId() {
        setUserToken();
        spotifyApi.getMe()
          .then((response) => {
            userId = response.id;
            console.log(userId);
        })
        .catch((err) => {
            console.error(err);
        })
    }

    async function getMySavedTracks() {
        const offset = 50;
        for (var i = 0; i < totalSaved; i += offset) {
          await spotifyApi.getMySavedTracks({ limit: offset, offset: i })
            .then((response) => {
              totalSaved = response.total
              getTrackAudioFeatures(response.items);
              console.log(response.offset);
            })
            .catch((err) => {
              console.error(err);
              console.error("ERROR: Error getting saved tracks");
            })
        }
    }

    function getTrackAudioFeatures(tracks) {
        const ids = [];
        tracks.forEach(t => {
          ids.push(t.track.id);
        })
        spotifyApi.getAudioFeaturesForTracks(ids)
            .then((response) => {
                var i = 0;
                response.audio_features.forEach(t => {
                    savedTracks.push({
                        id: t.id,
                        uri: t.uri,
                        name: tracks[i++].track.name,
                        energy: t.energy,
                        danceability: t.danceability,
                        tempo: t.tempo
                    })
                })
                filterTracks();
            })
            .catch((err) => {
                console.error(err);
                console.error("Error getting audio features for tracks")
        })
    }

    function filterTracks() {
        const filtered = [];
        savedTracks.forEach(t => {
            if (t.energy >= (energyValue / 10.0) && t.danceability >= (danceValue / 10.0) && t.tempo >= tempoValue) {
                filtered.push(t.uri);
            }
        });
        filteredUris = filtered;
        console.log(filteredUris);
    }

    async function createPlaylist() {
        await spotifyApi.createPlaylist(userId, 
        { 
            name: "API Playlist",
            description: `Liked Songs filtered by Energy: ${energyValue / 10.0}, Danceability: ${danceValue / 10.0}, and Tempo: ${tempoValue}. Created with https://achapcomputing.github.io/pump-exportify/`,
            public: true
        })
        .then((response) => {
            console.log("MAKING PLAYLIST! " + response.id);
            playlistId = response.id
            console.log("hi " + playlistId);
        })
        .catch((err) => {
            console.error(err);
            console.error("ERROR: Error creating playlist");
        })
    }

    async function addTracksToPlaylist() {
        const offset = 100;
        for (var i = 0; i < filteredUris.length; i += offset) {
            const uris = filteredUris.slice(i, i + offset);
            await spotifyApi.addTracksToPlaylist(playlistId, uris)
            .then(() => {
                console.log("added!");
            })
            .catch((err) => {
                console.error(err);
                console.error("ERROR: Error adding workout tracks to playlist")
            })
        }
    }
    
    async function generatePlaylist() {
        setPlaylistLoading(true);
        setPlaylistCreated(false);
        await getMyUserId();
        // get saved songs
        await getMySavedTracks()
        // filter saved songs
        // create new playlist
        await createPlaylist();
        // add songs to playlist
        await addTracksToPlaylist();
        if (playlistId !== "") {
            setPlaylistLinkId(playlistId);
        }
        if (filteredUris.length > 0) {
            setPlaylistLoading(false);
            setPlaylistCreated(true);
            setPlaylistLength(filteredUris.length);
        }
        console.log("help! " + playlistId)
    }

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col>
                        <RangeSlider
                            value={energyValue}
                            onChange={e => setEnergyValue(e.target.value)}
                            min={0}
                            max={10}
                            tooltip='off'
                            variant="secondary"
                        />
                    </Col>
                    <Col md="4" text-align="right">Minimum Energy Rating: {energyValue / 10.0}</Col>
                </Row>
                <Row>
                    <Col>
                        <RangeSlider
                            value={danceValue}
                            onChange={e => setDanceValue(e.target.value)}
                            min={0}
                            max={10}
                            tooltip='off'
                            variant='secondary'
                        />
                    </Col>
                    <Col md="4" text-align="right">Minimum Danceability Rating: {danceValue / 10.0}</Col>
                </Row>
                <Row>
                    <Col>
                        <RangeSlider
                            value={tempoValue}
                            onChange={e => setTempoValue(e.target.value)}
                            min={0}
                            max={200}
                            tooltip='off'
                            variant='secondary'
                        />
                    </Col>
                    <Col md="4" text-align="right">Minimum Tempo: {tempoValue} bpm</Col>
                </Row>
            </Container>

            <Container className="Generate">
                <Row>
                    <Button id="createButton" variant="outline-secondary" onClick={() => generatePlaylist()}>Generate Playlist</Button>
                </Row>
                <Row className="center">
                    {
                        playlistLoading &&
                        <Spinner animation="grow" variant='primary' />
                    }
                    {
                        playlistCreated && playlistLinkId &&
                        <div>
                            <p className="lead text-secondary">
                                <a href={`https://open.spotify.com/playlist/${playlistLinkId}`} target="_blank">Playlist Created!</a>
                            </p>
                            <p className="text-secondary">
                                {playlistLength} Songs Added
                            </p>                            
                        </div>
                    }
                </Row>
            </Container>

        </div>
    )
};

export default PlaylistGenerator;