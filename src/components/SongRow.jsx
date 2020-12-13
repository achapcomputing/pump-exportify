import React from "react"
// import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import PlaylistExporter from "./PlaylistExporter"
import { apiCallErrorHandler } from "helpers"

class SongRow extends React.Component {
  exportSong = () => {
    (new PlaylistExporter(
      this.props.accessToken,
      this.props.song,
      this.props.config
    )).export().catch(apiCallErrorHandler)
  }

//   renderTickCross(condition) {
//     if (condition) {
//       return <FontAwesomeIcon icon={['far', 'check-circle']} size="sm" />
//     } else {
//       return <FontAwesomeIcon icon={['far', 'times-circle']} size="sm" style={{ color: '#ECEBE8' }} />
//     }
//   }

  renderIcon(song) {
    if (song.name === 'Liked') {
      return <FontAwesomeIcon icon={['far', 'heart']} style={{ color: 'red' }} />;
    } else {
      return <FontAwesomeIcon icon={['fas', 'music']} />;
    }
  }

  render() {
    let song = this.props.song

    if(song.uri==null) return (
      <tr key={song.name}>
        <td>{this.renderIcon(song)}</td>
        <td>{song.name}</td>
        <td colSpan="2">This song is not supported</td>
        {/* <td>{this.renderTickCross(song.public)}</td>
        <td>{this.renderTickCross(song.collaborative)}</td> */}
        <td>{song.name}</td>
        <td>{song.name}</td>
        <td>&nbsp;</td>
      </tr>
    );

    return (
      <tr key={song.uri}>
        <td>{this.renderIcon(song)}</td>
        <td><a href={song.uri}>{song.name}</a></td>
        <td><a href={song.owner.uri}>{song.owner.display_name}</a></td>
        <td>{song.tracks.total}</td>
        <td>{this.renderTickCross(song.public)}</td>
        <td>{this.renderTickCross(song.collaborative)}</td>
        <td className="text-right">
          {/* <Button type="submit" variant="primary" size="xs" onClick={this.exportSong} className="text-nowrap">
            <FontAwesomeIcon icon={['fas', 'download']} size="sm" /> Export
          </Button> */}
        </td>
      </tr>
    );
  }
}

export default SongRow
