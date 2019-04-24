import React, { Component } from "react";
import RamButton from "./rambutton";

class Action extends Component {
    state = {};
    render() {
        return <RamButton onButtonClick={this.props.onButtonClick} />;
    }
}

export default Action;
