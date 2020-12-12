import './App.scss'
import "./icons"

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import "url-search-params-polyfill"

import Login from 'components/Login'
import PlaylistTable from "components/PlaylistTable"
import { getQueryParam } from "helpers"
import Logout from "components/Logout"
import FilterSliders from 'components/FilterSliders'

function App() {
  let view
  let key = new URLSearchParams(window.location.hash.substring(1))

  if (getQueryParam('rate_limit_message') !== '') {
    view = <div id="rateLimitMessage" className="lead">
      <p><FontAwesomeIcon icon={['fas', 'bolt']} style={{ fontSize: "50px", marginBottom: "20px" }} /></p>
      <p>Oops, Exportify has encountered a <a target="_blank" rel="noreferrer" href="https://developer.spotify.com/web-api/user-guide/#rate-limiting">rate limiting</a> error while using the Spotify API. This might be because of the number of users currently exporting playlists, or perhaps because you have too many playlists to export all at once. Try <a target="_blank" rel="noreferrer" href="https://github.com/watsonbox/exportify/issues/6#issuecomment-110793132">creating your own</a> Spotify application. If that doesn't work, please add a comment to <a target="_blank" rel="noreferrer" href="https://github.com/watsonbox/exportify/issues/6">this issue</a> where possible resolutions are being discussed.</p>
      <p style={{ marginTop: "50px" }}>It should still be possible to export individual playlists, particularly when using your own Spotify application.</p>
    </div>
  } else if (key.has('access_token')) {
    view = <div>
      <FilterSliders />
      <PlaylistTable accessToken={key.get('access_token')} />
    </div>
  } else {
    view = <Login />
  }

  return (
    <div className="App container">
      <header className="App-header">
        { key.has('access_token') && <Logout /> }
        <h1>
          <FontAwesomeIcon icon={['fab', 'spotify']} color="#84BD00" size="sm" /> <a href={process.env.PUBLIC_URL}>Pumpify</a>
        </h1>

        <p id="subtitle" className="lead text-secondary">
          Create Spotify playlist from Liked Songs to get Pumped
        </p>
      </header>

      {view}
      <footer className="App-footer">
        <p id="subtitle" className="lead text-secondary">
          Based on<a href="https://watsonbox.github.io/exportify/" target="_blank"> Exportify by Watsonbox</a> 
        </p>
      </footer>
    </div>
  );
}

export default App;
