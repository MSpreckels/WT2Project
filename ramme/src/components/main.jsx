import React, { Component } from "react";
import Action from "./action";
import Activity from "./activity";
import Text from "./text";
import ApiManager from "../js/ApiManager";
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
        currentPartyMembers: ["","","",""],
        currentPartyID: null,
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
        let am = new ApiManager("http://localhost:5000/api");
        let currentTime = new Date().getTime();
        let partyInfos = {location: this.state.meetingLocation, 
                        timeStart: currentTime,
                        timeEnd: currentTime + (this.state.meetingTime*60000)};
        
        //TODO: Fetch names of members
        am.post("parties", partyInfos).then((res) => {
            // let members = this.state.currentPartyMembers;
            // for(let i = 0; i < members.length; i++)
            // {
            //     members[i] = i < res.body.members.length ? res.body.members[i] : "...";
            // }
            // this.setState({currentPartyMembers: members});
            if(res.status === 201)
            {
                this.setState({currentPartyID: res.body.currentPartyID});
                this.props.socket.emit("joinParty", {room: res.body.currentPartyID});
            }

        });

        //TODO: update members using emit?

        //TODO: check if current party is full and set this.foundParty to true
        //setTimeout(this.foundParty, 5000);
    }

    exitParty() {
        let am = new ApiManager("http://localhost:5000/api");
        am.delete("parties").then((res) => {
            this.props.socket.emit("leaveParty", {room: this.state.currentPartyID});
            console.log("exited party");
        });
    }

    foundParty = () => {
        console.log("found a party! \\o/");
        this.setState({ hasParty: true });
    };

    componentDidMount() {
        
        //let am = new ApiManager("http://81.169.194.105:5000/api");
        let am = new ApiManager("http://localhost:5000/api");
        am.get("locations").then(res => this.setState({ locations: res.body }));
        am.get("catchphrases").then(res => this.setState({ catchphrases: res.body.catchphrases }));

        // this.socket.on("connect", function (data) {
        //     this.socket.emit("join", "Hello World from client");
        // });


    }

    render() {
        return (
            <main>
                <Text phrases={this.state.catchphrases != null ? this.state.catchphrases : []} />
                <Action onButtonClick={this.onButtonClick} buttonState={this.state.activity} hasParty={this.state.hasParty} meetingTime={this.state.meetingTime} meetingLocation={this.state.meetingLocation} />
                <Activity activity={this.state.activity} currentPartyMembers={this.state.currentPartyMembers} locations={this.state.locations}  onTimeChange={this.onTimeChange} onLocationChange={this.onLocationChange} />
            </main>
        );
    }
}

export default Main;
