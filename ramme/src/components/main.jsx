import React, { Component } from "react";
import Action from "./action";
import Activity from "./activity";
import Text from "./text";
import "../css/main.css";

class Main extends Component {
  state = {
    templatedata: null,
    names: null,
    activity: 0,
    hasParty: false
  };

  onButtonClick = lastButtonState => {
    const activity = this.state.activity === 0 ? 1 : 0;

    if (lastButtonState === 0) this.searchForAvailableGroup(); //if last button state was start then we are looking for a party now

    this.setState({ activity: activity });
  };

  searchForAvailableGroup() {
    //check if there are parties available who arent full yet
    //if none is found create a new party
    //for debug purposes i'll use setTimeout

    setTimeout(this.foundParty, 5000);
  }

  foundParty = () => {
    console.log("found a party! \\o/");
    this.setState({ hasParty: true });
  };

  componentDidMount() {
    let main = this;
    let request = new XMLHttpRequest();
    request.open("GET", "./templatedata.json", true);

    request.addEventListener("load", () => {
      if (request.status >= 200 && request.status < 300) {
        this.setState({ templatedata: JSON.parse(request.response) });
      }
    });

    request.send();

    //read names.json
    let requestNames = new XMLHttpRequest();
    //requestNames.open("GET", "http://localhost:5000/api/session", true);
    requestNames.open("GET", "http://81.169.194.105:5000/api/session", true);
    requestNames.withCredentials = true;
    requestNames.addEventListener("load", () => {
      if (requestNames.status >= 200 && requestNames.status < 300) {
        console.log(requestNames);
      }
    });
    requestNames.send();
  }

  render() {
    return (
      <main>
        <Text
          phrases={
            this.state.templatedata != null
              ? this.state.templatedata.catchphrases
              : []
          }
        />
        <Action
          onButtonClick={this.onButtonClick}
          buttonState={this.state.activity}
          hasParty={this.state.hasParty}
        />
        <Activity
          activity={this.state.activity}
          data={this.state.templatedata}
        />
      </main>
    );
  }
}

export default Main;
