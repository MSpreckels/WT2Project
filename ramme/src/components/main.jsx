import React, { Component } from "react";
import Action from "./action";
import Activity from "./activity";
import Text from "./text";
import "../css/main.css";

class Main extends Component {
    state = {
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

    render() {
        return (
            <main>
                <Text />
                <Action onButtonClick={this.onButtonClick} buttonState={this.state.activity} hasParty={this.state.hasParty} />
                <Activity activity={this.state.activity} />
            </main>
        );
    }
}

export default Main;
