import React, { Component } from "react";
import "../css/chatWindow.css";

class ChatWindow extends Component {
    state = {};

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        //return <img src={chat} alt="Chat" className="center" />;
        return (
            <div>
                <div id="chatMessageContainer" style={{ height: "250px", overflowY: "scroll", scrollTop: "100" }}>
                    {GetMessages(this.props.messages).map(x => (
                        <div key={x[0]} className={x[3] ? "myMessage" : "otherMessage"}>
                            <h4>{x[1]}</h4>
                            <p>{x[2]}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <input id="chatMessage" type="input" placeholder="Nachricht schreiben..." autocomplete="off" onKeyDown={e => InvokeButtonClickOnEnter(e)} />
                    <button
                        id="chatMessageButton"
                        onClick={() => {
                            this.props.onSendMessage(document.getElementById("chatMessage").value);
                            document.getElementById("chatMessage").value = "";
                        }}
                        hidden
                    >
                        Send
                    </button>
                </div>
            </div>
        );
    }

    scrollToBottom() {
        const chatMessageContainer = document.getElementById("chatMessageContainer");
        chatMessageContainer.scrollTop = chatMessageContainer.scrollHeight - chatMessageContainer.clientHeight;
    }
}

function InvokeButtonClickOnEnter(event) {
    if (event.keyCode === 13) {
        document.getElementById("chatMessageButton").click();
    }
}

function GetMessages(msgs) {
    let result = [];
    for (let i = 0; i < msgs.length; i++) {
        result.push([msgs[i] + i, msgs[i][0], msgs[i][1], msgs[i][2]]);
    }
    return result;
}

export default ChatWindow;
