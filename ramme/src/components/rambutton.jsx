import React, { Component } from "react";

class RamButton extends Component {
    state = {};
    render() {
        return <button className="ramButton center" onClick={this.props.onButtonClick} />;
    }
}

export default RamButton;
