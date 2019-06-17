import React, { Component } from "react";
import Chat from "./chat";
import "../css/footer.css";

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer>
        <Chat socket={this.props.socket}/>
        {/* <Info /> */}
      </footer>
    );
  }
}

export default Footer;
