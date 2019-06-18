import React, { Component } from "react";
import Popup from "reactjs-popup";
import ChatWindow from "../components/chatwindow";
import chat from "../images/baseline-chat-24px.svg";

var sendMessage = false;
class Chat extends Component {
    state = {
        res: null
    };

    componentDidMount() {
        this.props.am.get("messages")
            .then(res => this.setState({ res: res.body.messages.slice(0).reverse() }))
            .catch(console.log);

        this.props.socket.on("message", msg => {
            this.setState({ res: this.state.res.concat([msg.concat(sendMessage)]) });
            sendMessage = false;
        });
    }

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
            >
                <ChatWindow messages={this.state.res != null ? this.state.res : []} onSendMessage={this.sendMessage} />
            </Popup>
        );
    }

    sendMessage = msg => {
        sendMessage = true;
        this.props.am.post("messages", { message: msg })
            .catch(console.log);
    };
}

export default Chat;
