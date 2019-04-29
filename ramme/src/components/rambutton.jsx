import React, { Component } from "react";

class RamButton extends Component {
    state = {};
    render() {
        return <button className={this.props.buttonState === 0 ? "ramButton-play center" : "ramButton-loading center"} onClick={() => this.props.onButtonClick(this.props.buttonState)} />;
    }
}

export default RamButton;
