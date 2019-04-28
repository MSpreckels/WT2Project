import React, { Component } from "react";
import { ReactComponent as Logo } from "../images/baseline-settings-20px.svg";

class Option extends Component {
  state = {};
  render() {
    return (
      <div className="center">
        <Logo />
      </div>
    );
  }
}

export default Option;
