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
            <div>
              {this.state.users[0] === "" ? "..." : this.state.users[0]}
            </div>
          </li>
          <li key="1">
            <div>
              {this.state.users[1] === "" ? "..." : this.state.users[1]}
            </div>
          </li>
          <li key="2">
            <div>
              {this.state.users[2] === "" ? "..." : this.state.users[2]}
            </div>
          </li>
          <li key="3">
            <div>
              {this.state.users[3] === "" ? "..." : this.state.users[3]}
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default PartyList;
