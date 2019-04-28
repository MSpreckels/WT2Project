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
            <li key={user}>{user !== "" ? user : "..."}</li>
          ))}
        </ul>
      </div>
    );
  }

  getKey() {
    let i = 0;
    return i++;
  }
}

export default PartyList;
