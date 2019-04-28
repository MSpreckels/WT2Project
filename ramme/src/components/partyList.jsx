import React, { Component } from "react";

class PartyList extends Component {
  state = {
    users: ["Max Mustermann", "Peter Lustig", "", ""]
  };
  render() {
    return (
      <div className="c">
        <ul className="partyList center">
          <li key="0">
            {this.state.users[0] === "" ? "..." : this.state.users[0]}
          </li>
          <li key="1">
            {this.state.users[1] === "" ? "..." : this.state.users[1]}
          </li>
          <li key="2">
            {this.state.users[2] === "" ? "..." : this.state.users[2]}
          </li>
          <li key="3">
            {this.state.users[3] === "" ? "..." : this.state.users[3]}
          </li>
        </ul>
      </div>
    );
  }
}

export default PartyList;
