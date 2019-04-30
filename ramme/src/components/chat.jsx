import React, { Component } from "react";
import chat from "../images/baseline-chat-24px.svg";

class Chat extends Component {
    state = {};
    render() {
      return <img src={chat} alt="Chat" className="center" />;
    }
  }
  
  export default Chat;