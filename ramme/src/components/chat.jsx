import React, { Component } from "react";
import Popup from "reactjs-popup";
import ChatWindow from "../components/chatwindow";
import chat from "../images/baseline-chat-24px.svg";
import ApiManager from "../js/ApiManager";

const am = new ApiManager("http://localhost:5000/api");
class Chat extends Component {
    state = {
        res: null
    };

    componentDidMount() {
        this.FetchAllMessageFromServer();
    }

    render() {
        //return <img src={chat} alt="Chat" className="center" />;
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
                <ChatWindow messages={this.state.res != null ? this.state.res.messages : []} onSendMessage={this.sendMessage} />
            </Popup>
        );
    }

    sendMessage = msg => {
        //console.log(msg);
        let am = new ApiManager("http://localhost:5000/api");

        am.initialize(() => {
            am.post("messages", msg)
                .then(res => (res.result === "OK" ? this.FetchAllMessageFromServer() : console.log("Error")))
                .catch(console.log);
        }).catch(console.log);
    };

    FetchAllMessageFromServer = () => {
        am.initialize(() => {
            am.get("messages")
                .then(res => this.setState({ res }))
                .catch(console.log);
        }).catch(console.log);
    };
}

export default Chat;
