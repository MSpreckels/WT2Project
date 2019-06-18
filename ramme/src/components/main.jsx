import React, { Component } from "react";
import Action from "./action";
import Activity from "./activity";
import Text from "./text";
import "../css/main.css";

class Main extends Component {
  state = {
    names: null,
    activity: 0,
    hasParty: false,
    locations: [],
    meetingTime: 0,
    meetingLocation: "Mensa Hochschule Bochum",
    catchphrases: null,
    currentPartyMembers: ["...", "...", "...", "..."],
    currentPartyID: null
  };

  onButtonClick = lastButtonState => {
    const activity = this.state.activity === 0 ? 1 : 0;

    if (lastButtonState === 0) this.searchForAvailableGroup(); //if last button state was start then we are looking for a party now
    if (lastButtonState === 1) this.exitParty();
    this.setState({ activity: activity });
  };

  onTimeChange = timeID => {
    console.log(timeID);
    this.setState({ meetingTime: timeID });
  };

  onLocationChange = event => {
    this.setState({ meetingLocation: event.target.value });
  };

  searchForAvailableGroup() {
    //check if there are parties available who arent full yet
    //if none is found create a new party
    //for debug purposes i'll use setTimeout
    let currentTime = new Date().getTime();
    let partyInfos = {
      location: this.state.meetingLocation,
      timeStart: currentTime,
      timeEnd: currentTime + this.state.meetingTime * 60000
    };

    //TODO: Fetch names of members
    this.props.am.post("parties", partyInfos).then(res => {
      // let members = this.state.currentPartyMembers;
      // for(let i = 0; i < members.length; i++)
      // {
      //     members[i] = i < res.body.members.length ? res.body.members[i] : "...";
      // }
      // this.setState({currentPartyMembers: members});
      if (res.status === 201) {
        this.setState({ currentPartyID: res.body.currentPartyID });
        this.props.socket.emit("joinParty", {
          room: res.body.currentPartyID
          //clientID: res.body.currentClientID
        });
      }
    });
  }

  exitParty() {
    this.props.am.delete("parties").then(res => {
      this.props.socket.emit("leaveParty", { room: this.state.currentPartyID });
      this.setState({ currentPartyMembers: ["...", "...", "...", "..."] });
      console.log("exited party");
    });
  }

  foundParty = () => {
    console.log("found a party! \\o/");
    this.setState({ hasParty: true });
  };
  componentWillMount() {
    this.props.am.get("parties").then(res => {
      console.log(res);

      if (res.status === 200) {
        this.setState({
          currentPartyID: res.body.partyID,
          activity: 1
        });
        this.props.socket.emit("joinParty", {
          room: res.body.groupID
          //clientID: res.body.currentClientID
        });
      }
    });
  }
  componentDidMount() {
    this.props.am
      .get("locations")
      .then(res => this.setState({ locations: res.body }));
    this.props.am
      .get("catchphrases")
      .then(res => this.setState({ catchphrases: res.body.catchphrases }));

    this.props.socket.on("OnPartyJoin", data => {
      console.log("OnPartyJoin ", data);
      let currentParty = this.state.currentPartyMembers;
      let partyFull = true;
      for (let i = 0; i < currentParty.length; i++) {
        if (i < data.currentMembers.length)
          currentParty[i] = data.currentMembers[i];
        else {
          currentParty[i] = "...";
          partyFull = false;
        }
      }

      this.setState({ currentPartyMembers: currentParty, hasParty: partyFull });
      //TODO: check if current party is full and set this.foundParty to true
    });

    this.props.socket.on("OnPartyLeave", data => {
      console.log(data);
      let currentParty = this.state.currentPartyMembers;
      for (let i = 0; i < currentParty.length; i++) {
        currentParty[i] =
          i < data.currentMembers.length ? data.currentMembers[i] : "...";
      }
      this.setState({ currentPartyMembers: currentParty });
    });
  }

  render() {
    return (
      <main>
        <Text
          phrases={
            this.state.catchphrases != null ? this.state.catchphrases : []
          }
        />
        <Action
          onButtonClick={this.onButtonClick}
          buttonState={this.state.activity}
          hasParty={this.state.hasParty}
          meetingTime={this.state.meetingTime}
          meetingLocation={this.state.meetingLocation}
        />
        <Activity
          activity={this.state.activity}
          currentPartyMembers={this.state.currentPartyMembers}
          locations={this.state.locations}
          onTimeChange={this.onTimeChange}
          onLocationChange={this.onLocationChange}
        />
      </main>
    );
  }
}

export default Main;
