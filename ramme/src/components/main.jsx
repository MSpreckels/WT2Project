import React, { Component } from "react";
import Action from "./action";
import Activity from "./activity";
import "../css/main.css";

class Main extends Component {
  state = {};

  onButtonClick = () => {
    console.log("Button clicked! Search for available party and switch view.");
  };

  render() {
    return (
      <main>
        {/* TODO: Add text component here */}
        <Action onButtonClick={this.onButtonClick} />
        <Activity />
      </main>
    );
  }
}

export default Main;
