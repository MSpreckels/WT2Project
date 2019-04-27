import React, { Component } from "react";

class PartyList extends Component {
  state = {
    users: ["Max Mustermann", "Peter Lustig", "", ""]
  };
  render() {
    return (
      <div className="center">
        <ul className="partyList center">
          {this.state.users.map(user => (
            <li>{user !== "" ? user : "..."}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PartyList;
