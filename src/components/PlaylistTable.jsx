import React from "react"
import { ProgressBar } from "react-bootstrap"

import PlaylistsData from "./data/PlaylistsData"
import ConfigDropdown from "./ConfigDropdown"
import PlaylistSearch from "./PlaylistSearch"
import PlaylistRow from "./PlaylistRow"
import Paginator from "./Paginator"
import PlaylistsExporter from "./PlaylistsExporter"
import { apiCall, apiCallErrorHandler } from "helpers"

class PlaylistTable extends React.Component {
  PAGE_SIZE = 20

  userId = null
  playlistsData = null

  state = {
    initialized: false,
    searching: false,
    playlists: [],
    playlistCount: 0,
    likedSongs: {
      limit: 0,
      count: 0
    },
    currentPage: 1,
    progressBar: {
      show: false,
      label: "",
      value: 0
    },
    config: {
      includeArtistsData: false,
      includeAudioFeaturesData: false
    }
  }

  constructor(props) {
    super(props)

    this.configDropdown = React.createRef()
    this.playlistSearch = React.createRef()

    if (props.config) {
      this.state.config = props.config
    }
  }

  handlePlaylistSearch = async (query) => {
    if (query.length === 0) {
      this.handlePlaylistSearchCancel()
    } else {
      const playlists = await this.playlistsData.search(query).catch(apiCallErrorHandler)

      this.setState({
        searching: true,
        playlists: playlists,
        playlistCount: playlists.length,
        currentPage: 1
      })

      if (playlists.length === this.playlistsData.SEARCH_LIMIT) {
        this.setSubtitle(`First ${playlists.length} results with "${query}" in playlist name`)
      } else {
        this.setSubtitle(`${playlists.length} results with "${query}" in playlist name`)
      }
    }
  }

  handlePlaylistSearchCancel = () => {
    return this.loadCurrentPlaylistPage().catch(apiCallErrorHandler)
  }

  loadCurrentPlaylistPage = async () => {
    if (this.playlistSearch.current) {
      this.playlistSearch.current.clear()
    }

    const playlists = await this.playlistsData.slice(
      ((this.state.currentPage - 1) * this.PAGE_SIZE),
      ((this.state.currentPage - 1) * this.PAGE_SIZE) + this.PAGE_SIZE
    ).catch(apiCallErrorHandler)

    // Show library of saved tracks if viewing first page
    if (this.state.currentPage === 1) {
      const likedTracksUrl = `https://api.spotify.com/v1/users/${this.userId}/tracks`
      const likedTracksResponse = await apiCall(likedTracksUrl, this.props.accessToken)
      const likedTracksData = likedTracksResponse.data

      playlists.unshift({
        "id": "liked",
        "name": "Liked",
        "public": false,
        "collaborative": false,
        "owner": {
          "id": this.userId,
          "display_name": this.userId,
          "uri": "spotify:user:" + this.userId
        },
        "tracks": {
          "href": "https://api.spotify.com/v1/me/tracks",
          "limit": likedTracksData.limit,
          "total": likedTracksData.total
        },
        "uri": "spotify:user:" + this.userId + ":saved"
      });

      // FIXME: Handle unmounting
      this.setState({
        likedSongs: {
          limit: likedTracksData.limit,
          count: likedTracksData.total
        }
      })
    }

    // FIXME: Handle unmounting
    this.setState(
      {
        initialized: true,
        searching: false,
        playlists: playlists,
        playlistCount: await this.playlistsData.total()
      },
      () => {
        const min = ((this.state.currentPage - 1) * this.PAGE_SIZE) + 1
        const max = Math.min(min + this.PAGE_SIZE - 1, this.state.playlistCount)
        this.setSubtitle(`${min}-${max} of ${this.state.playlistCount} playlists for ${this.userId}`)
      }
    )
  }

  handlePlaylistsLoadingStarted = () => {
    this.configDropdown.current.spin(true)
  }

  handlePlaylistsLoadingDone = () => {
    this.configDropdown.current.spin(false)
  }

  handlePlaylistsExportDone = () => {
    this.setState({
      progressBar: {
        show: true,
        label: "Done!",
        value: this.state.playlistCount
      }
    })
  }

  handlePlaylistExportStarted = (playlistName, doneCount) => {
    this.setState({
      progressBar: {
        show: true,
        label: `Exporting ${playlistName}...`,
        value: doneCount
      }
    })
  }

  handleConfigChanged = (config) => {
    this.setState({ config: config })
  }

  handlePageChanged = (page) => {
    try {
      this.setState(
        { currentPage: page },
        this.loadCurrentPlaylistPage
      )
    } catch(error) {
      apiCallErrorHandler(error)
    }
  }

  setSubtitle(subtitle) {
    if (document.getElementById("subtitle") !== null) {
      document.getElementById("subtitle").textContent = subtitle
    }
  }

  async componentDidMount() {
    try {
      this.userId = await apiCall("https://api.spotify.com/v1/me", this.props.accessToken)
        .then(response => response.data.id)
      this.playlistsData = new PlaylistsData(
        this.props.accessToken,
        this.userId,
        this.handlePlaylistsLoadingStarted,
        this.handlePlaylistsLoadingDone
      )

      await this.loadCurrentPlaylistPage()
    } catch(error) {
      apiCallErrorHandler(error)
    }
  }

  render() {
    const progressBar = <ProgressBar striped variant="primary" animated={this.state.progressBar.value < this.state.playlistCount} now={this.state.progressBar.value} max={this.state.playlistCount} label={this.state.progressBar.label} />

    if (this.state.initialized) {
      return (
        <div id="playlists">
          <div id="playlistsHeader">
            <Paginator currentPage={this.state.currentPage} pageLimit={this.PAGE_SIZE} totalRecords={this.state.playlistCount} onPageChanged={this.handlePageChanged}/>
            <PlaylistSearch onPlaylistSearch={this.handlePlaylistSearch} onPlaylistSearchCancel={this.handlePlaylistSearchCancel} ref={this.playlistSearch} />
            <ConfigDropdown onConfigChanged={this.handleConfigChanged} ref={this.configDropdown} />
            {this.state.progressBar.show && progressBar}
          </div>
          <table className="table table-hover table-sm">
            <thead>
              <tr>
                <th style={{width: "30px"}}></th>
                <th>Name</th>
                <th style={{width: "150px"}}>Owner</th>
                <th style={{width: "100px"}}>Tracks</th>
                <th style={{width: "120px"}}>Public?</th>
                <th style={{width: "120px"}}>Collaborative?</th>
                <th style={{width: "100px"}} className="text-right">
                  {/* <PlaylistsExporter
                    accessToken={this.props.accessToken}
                    onPlaylistsExportDone={this.handlePlaylistsExportDone}
                    onPlaylistExportStarted={this.handlePlaylistExportStarted}
                    playlistsData={this.playlistsData}
                    likedSongs={this.state.likedSongs}
                    config={this.state.config}
                    disabled={this.state.searching}
                  /> */}
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.playlists.map((playlist, i) => {
                return <PlaylistRow
                  playlist={playlist}
                  key={playlist.id}
                  accessToken={this.props.accessToken}
                  config={this.state.config}
                />
              })}
            </tbody>
          </table>
          <div id="playlistsFooter">
            <Paginator currentPage={this.state.currentPage} pageLimit={this.PAGE_SIZE} totalRecords={this.state.playlistCount} onPageChanged={this.handlePageChanged}/>
          </div>
        </div>
      );
    } else {
      return <div className="spinner" data-testid="playlistTableSpinner"></div>
    }
  }
}

export default PlaylistTable
