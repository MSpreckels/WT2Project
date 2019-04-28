import React, { Component } from "react";
import PartyList from "./partyList";
import LocationAndTime from "./locationAndTime";
class Activity extends Component {
  state = {};

  render() {
    return (
      <section id="activity">
        {this.props.activity === 0 ? <LocationAndTime /> : <PartyList />}
      </section>
    );
  }
}

export default Activity;
