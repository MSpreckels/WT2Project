import React, { Component } from "react";
import Popup from "reactjs-popup";
import ChatWindow from "../components/chatwindow";
import chat from "../images/baseline-chat-24px.svg";
import ApiManager from "../js/ApiManager";

class Chat extends Component {
  state = {
    res: null
  };

  componentDidMount() {
    let am = new ApiManager("http://localhost:5000/api");
    /*setInterval(() => {
            am.initialize(() => {
                am.get("messages")
                    .then(res => this.setState({ res }))
                    .catch(console.log);
            }).catch(console.log);
        }, 1000);*/
  }

  render() {
    //return <img src={chat} alt="Chat" className="center" />;
    return (
      <Popup
        trigger={
          <button
            className="center"
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            <img src={chat} alt="Chat" className="center" />
          </button>
        }
        position="top center"
        closeOnDocumentClick
      >
        <ChatWindow
          messages={this.state.res != null ? this.state.res.messages : []}
          onSendMessage={this.sendMessage}
        />
      </Popup>
    );
  }

  setMessage = message => {
    console.log(message);
  };

  sendMessage = msg => {
    //console.log(msg);
    let am = new ApiManager("http://localhost:5000/api");

    am.post("messages", msg)
      .then(res => console.log(res))
      .catch(console.log);
  };
}

export default Chat;
