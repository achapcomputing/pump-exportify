import React, { Component } from 'react';
import { Button, Container, Row, Col, Spinner, Popover, OverlayTrigger, InputGroup, FormControl, Accordion, Card } from 'react-bootstrap';

import '../App.scss';

export default class PlaylistName extends Component {

  constructor() {
    super();
    this.state = {
      playlistName: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    this.setState({ playlistName: value });
    this.props.updatePlaylistName(value);
  }

  render() {

    return (
      <Row>
        <InputGroup className="mb-3 w-50">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Playlist Name</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder={this.props.defaultName}
            aria-label={this.props.defaultName}
            aria-describedby="basic-addon1"
            className="w-50"
            value={this.state.playlistName}
            onChange={this.handleChange}
          />
          <OverlayTrigger placement="right" overlay={helpPopover}>
            <Button id="infoPopover" size="sm" variant="outline-primary">?</Button>
          </OverlayTrigger>
        </InputGroup>
      </Row>
    )

  }
}

const helpPopover = (
    <Popover>
        <Popover.Title>How does Pumpify work?</Popover.Title>
        <Popover.Content>Pumpify reads through your entire Liked Songs library on Spotify and adds every song that meets minimum energy, danceability, and tempo requirements to a new playlist. If you have a lot of songs saved to your Liked Songs Library, Pumpify may take a while to load.</Popover.Content>
    </Popover>
);
