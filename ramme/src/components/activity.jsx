import React, { Component } from "react";
import PartyList from "./partyList";
import LocationAndTime from "./locationAndTime";
class Activity extends Component {
  state = {};

  render() {
    return (
      <section id="activity">
        {this.props.activity === 0 ? (
          
            <LocationAndTime
              readonly={false}
              locations={this.props.locations}
              onTimeChange={this.props.onTimeChange}
              onLocationChange={this.props.onLocationChange}
            />
        ) : (
          <PartyList currentPartyMembers={this.props.currentPartyMembers} />
        )}
      </section>
    );
  }
}

export default Activity;
