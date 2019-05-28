import React, { Component } from "react";
import RamButton from "./rambutton";
import LocationAndTime from "./locationAndTime";

class Action extends Component {
    state = {};
    render() {
        return <div className="actionContainer">{this.props.hasParty ? <LocationAndTime readonly={true} meetingTime={this.props.meetingTime} meetingLocation={this.props.meetingLocation} /> : <RamButton onButtonClick={this.props.onButtonClick} buttonState={this.props.buttonState} />}</div>;
    }
}

export default Action;
