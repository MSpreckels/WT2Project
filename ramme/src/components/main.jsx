import React, { Component } from "react";
import Action from "./action";
import Activity from "./activity";
import Text from "./text";
import "../css/main.css";

class Main extends Component {
  state = {
    activity: 0
  };

  onButtonClick = () => {
    const activity = this.state.activity === 0 ? 1 : 0;
    this.setState({ activity });
  };

  render() {
    return (
      <main>
        <Text />
        <Action onButtonClick={this.onButtonClick} />
        <Activity activity={this.state.activity} />
      </main>
    );
  }
}

export default Main;
