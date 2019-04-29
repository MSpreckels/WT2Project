import React, { Component } from "react";
import { ReactComponent as Logo } from "../images/baseline-settings-20px.svg";

class Option extends Component {
  state = { rotate: false };
  render() {
    return (
      <div className="partyList">
        <Logo
          onClick={() => this.setState({ rotate: true })}
          onAnimationEnd={() => this.setState({ rotate: false })}
          className={this.state.rotate ? "rotate" : ""}
        />
      </div>
    );
  }
}
/*
        <Logo
          onClick={() => this.setState({ rotate: true })}
          onAnimationEnd={() => this.setState({ rotate: false })}
          className={rotate ? "rotate" : ""}
        />
        */

export default Option;
