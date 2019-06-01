import React, { Component } from "react";
import { ReactComponent as Logo } from "../images/baseline-settings-20px.svg";
import "../css/option.css";

class Option extends Component {
  state = { rotate: false };
  render() {
    return (
      <div className="option">
        <Logo
          onClick={() => this.setState({ rotate: true })}
          onAnimationEnd={() => this.setState({ rotate: false })}
          className={this.state.rotate ? "rotate" : ""}
        />
      </div>
    );
  }
}

export default Option;
