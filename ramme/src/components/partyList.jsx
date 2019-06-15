import React, { Component } from "react";
import "../css/partyList.css";

class PartyList extends Component {
  state = {};
  render() {
    return (
      <div className="c">
        <ul className="partyList center">
          {this.props.currentPartyMembers.map((user, index) => {
            return <li key={index}><div>{user}</div></li>
          })}
          {/*<li key="0">
            <div>
              {this.props.users[0] != null && this.props.users[0] === "" ? "..." : this.props.users[0]}
            </div>
          </li>
          <li key="1">
            <div>
              {this.props.users[1] != null && this.props.users[1] === "" ? "..." : this.props.users[1]}
            </div>
          </li>
          <li key="2">
            <div>
              {this.props.users[2] != null && this.props.users[2] === "" ? "..." : this.props.users[2]}
            </div>
          </li>
          <li key="3">
            <div>
              {this.props.users[3] != null && this.props.users[3] === "" ? "..." : this.props.users[3]}
            </div>
        </li>*/}
        </ul>
      </div>
    );
  }
}

export default PartyList;
