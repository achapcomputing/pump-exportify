import React, { Component } from 'react';
import { Button, Container, Row, Col, Popover, OverlayTrigger } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';

import '../App.scss';
import '../index.scss';

export default class Slider extends Component {

  constructor() {
    super();
    this.state = {
      filterValue: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    this.setState({ filterValue: value });
    this.props.updateFilterValue(this.props.filterCategory, value);
  }

  componentDidMount() {
    this.setState({
      filterValue: this.props.initialValue
    })
  }

  render() {

    

    let displayInfo = (cat) => {
      if (cat === 'energy') {
        return ['Energy', 10, energyPopover];
      } else if (cat === 'dance') {
        return ['Danceability', 10, dancePopover];
      } else if (cat === 'tempo') {
        return ['Tempo', 1, tempoPopover];
      }
    }

    return (
      <Row>
        <Col sm='8'>
          <RangeSlider
            value={this.state.filterValue}
            onChange={this.handleChange}
            min={this.props.min}
            max={this.props.max}
            tooltip='off'
          />
        </Col>
        <Col sm='4' text-align='right'>
          Minimum {displayInfo(this.props.filterCategory)[0]} Rating: {this.state.filterValue / displayInfo(this.props.filterCategory)[1]}
          <OverlayTrigger placement="right" overlay={displayInfo(this.props.filterCategory)[2]} >
            <Button id="infoPopover" size="sm" variant="outline-primary">?</Button>
          </OverlayTrigger>
        </Col>
      </Row>
    )
  }
}

const energyPopover = (
  <Popover>
    <Popover.Title>Energy</Popover.Title>
    <Popover.Content>Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.</Popover.Content>
  </Popover>
);

const dancePopover = (
  <Popover>
    <Popover.Title>Danceability</Popover.Title>
    <Popover.Content>Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.</Popover.Content>
  </Popover>
);

const tempoPopover = (
  <Popover>
    <Popover.Title>Tempo</Popover.Title>
    <Popover.Content>The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.</Popover.Content>
  </Popover>
);
