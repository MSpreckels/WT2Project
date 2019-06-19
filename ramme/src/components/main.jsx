import React, { Component } from "react";
import Action from "./action";
import Activity from "./activity";
import Text from "./text";
import Chat from "./chat";
import "../css/main.css";

var sendMessage = false;

class Main extends Component {
  state = {
    activity: 0,//0 = not searching, 1 = searching/in a group
    hasParty: false,
    locations: [],
    meetingTime: 0,
    meetingLocation: "Mensa Hochschule Bochum",
    catchphrases: null,
    currentPartyMembers: ["...", "...", "...", "..."],
    currentPartyID: null,
    messages: null
  };

  onButtonClick = lastButtonState => {
    const activity = this.state.activity === 0 ? 1 : 0;
    this.setState({ activity: activity });

    if (lastButtonState === 0) this.searchForAvailableGroup(); //if last button state was start then we are looking for a party
    if (lastButtonState === 1) this.exitParty(); //if we were looking for a party, exitParty
  };

  onTimeChange = timeID => {
    console.log(timeID);
    this.setState({ meetingTime: timeID });
  };

  onLocationChange = event => {
    this.setState({ meetingLocation: event.target.value });
  };

  searchForAvailableGroup() {
    let currentTime = new Date().getTime();
    let partyInfos = {
      location: this.state.meetingLocation,
      timeStart: currentTime,
      timeEnd: currentTime + this.state.meetingTime * 60000
    };
    
    //check if there are parties available who arent full yet
    //if none is found create a new party
    this.props.am.post("parties", partyInfos).then(res => {
      if (res.status === 201) {
        this.setState({ currentPartyID: res.body.currentPartyID });
        this.props.socket.emit("joinParty", {
          room: res.body.currentPartyID
        });
        this.getMessages();
      }
    });
  }

  exitParty() {
    this.props.am.delete("parties").then(res => {
      this.props.socket.emit("leaveParty", { room: this.state.currentPartyID });
      this.setState({ currentPartyMembers: ["...", "...", "...", "..."], currentPartyID: null, messages: null});
      console.log("exited party");
    });
  }

  //TODO: Send chat message if someone leaves the party?
  sendMessage = msg => {
    sendMessage = true;
    this.props.am.post("messages", { message: msg })
        .catch(console.log);
  };

  getMessages()
  {
    this.props.am.get("messages")
    .then(res => this.setState({ messages: res.body.messages.slice(0).reverse() }))
    .catch(console.log);
  }

  componentWillMount() {
    this.props.am.get("parties").then(res => {
      if (res.status === 200) {
        this.setState({
          currentPartyID: res.body.partyID,
          activity: 1
        });
        this.props.socket.emit("joinParty", {
          room: res.body.groupID
        });
        this.getMessages();

      }
    });
  }

  componentDidMount() {
    //Fetch Locations
    this.props.am
      .get("locations")
      .then(res => this.setState({ locations: res.body }));

    //Fetch Catchphrases
    this.props.am
      .get("catchphrases")
      .then(res => this.setState({ catchphrases: res.body.catchphrases }));

    //Handle OnPartyJoin socketio event
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
    });

    //Handle OnPartyLeave socketio event
    this.props.socket.on("OnPartyLeave", data => {
      console.log(data);
      let currentParty = this.state.currentPartyMembers;
      for (let i = 0; i < currentParty.length; i++) {
        currentParty[i] =
          i < data.currentMembers.length ? data.currentMembers[i] : "...";
      }
      this.setState({ currentPartyMembers: currentParty });
    });

    //Handle ChatMessages
    this.props.socket.on("message", msg => {
      let message = [msg.concat(sendMessage)];

      if(this.state.messages === null)
      {
        this.setState({ messages:  message});
      }
      else
      {          
        this.setState({ messages: this.state.messages.concat(message) });
      }
      sendMessage = false;
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
        <Chat activity={this.state.activity} messages={this.state.messages} onSendMessage={this.sendMessage}/>

      </main>
    );
  }
}

export default Main;
