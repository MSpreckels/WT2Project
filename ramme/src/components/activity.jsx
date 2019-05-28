import React, { Component } from "react";
import PartyList from "./partyList";
import LocationAndTime from "./locationAndTime";
class Activity extends Component {
  state = {};

  render() {
    return (
      <section id="activity">
        {this.props.activity === 0 ? (
          this.props.data != null ? (
            <LocationAndTime
              readonly={false}
              locations={this.props.locations}
              onTimeChange={this.props.onTimeChange}
              onLocationChange={this.props.onLocationChange}
            />
          ) : (
            "Loading.."
          )
        ) : (
          <PartyList users={this.props.data.users} />
        )}
      </section>
    );
  }
}

export default Activity;
