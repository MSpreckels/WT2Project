import React, { Component } from "react";
import Popup from "reactjs-popup";
import ChatWindow from "../components/chatwindow";
import chat from "../images/baseline-chat-24px.svg";
import ApiManager from "../js/ApiManager";

var sendMessage = false;
class Chat extends Component {
    state = {
        res: null
    };

    componentDidMount() {
        this.props.am.get("messages")
            .then(res => this.setState({ res: res.body.messages }))
            .catch(console.log);

        this.props.socket.on("message", msg => {
            this.setState({ res: this.state.res.concat([msg.concat(sendMessage)]) });
            sendMessage = false;
        });

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
        //console.log(msg);
        this.props.am.post("messages", { message: msg })
            .then(res => {
                sendMessage = true;
                console.log(res);
                //this.setState({ res: this.state.res.concat([res]) });
            })
            .catch(console.log);
    };
}

export default Chat;
