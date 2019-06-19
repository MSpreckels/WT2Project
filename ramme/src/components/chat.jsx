import React, { Component } from "react";
import Popup from "reactjs-popup";
import ChatWindow from "../components/chatwindow";
import chat from "../images/baseline-chat-24px.svg";

class Chat extends Component {
    state = {
    };

    render() {
        return (
            <Popup
                trigger={
                    <button className="center" style={{ border: "none", backgroundColor: "transparent" }}>
                        <img src={chat} alt="Chat" className="center" />
                    </button>
                }
                position="top center"
                closeOnDocumentClick
                disabled={this.props.activity == 0}
            >
                <ChatWindow messages={this.props.messages != null ? this.props.messages : []} onSendMessage={this.props.onSendMessage} />
            </Popup>
        );
    }

    
}

export default Chat;
