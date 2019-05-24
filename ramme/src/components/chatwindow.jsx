import React, { Component } from "react";

class ChatWindow extends Component {
    state = {};

    componentDidMount() {
        const chatMessageContainer = document.getElementById("chatMessageContainer");
        chatMessageContainer.scrollTop = chatMessageContainer.scrollHeight - chatMessageContainer.clientHeight;

        setInterval(function() {
            if (chatMessageContainer == null) return;
            // allow 1px inaccuracy by adding 1
            const isScrolledToBottom = chatMessageContainer.scrollHeight - chatMessageContainer.clientHeight <= chatMessageContainer.scrollTop + 40;
            // scroll to bottom if isScrolledToBottom is true
            if (isScrolledToBottom) {
                chatMessageContainer.scrollTop = chatMessageContainer.scrollHeight - chatMessageContainer.clientHeight;
            }
        }, 500);
    }

    render() {
        //return <img src={chat} alt="Chat" className="center" />;
        return (
            <div>
                <div id="chatMessageContainer" style={{ height: "200px", overflowY: "scroll", scrollTop: "100" }}>
                    {GetMessages(this.props.messages).map(x => (
                        <p key={x[0]}>{x[1] + ": " + x[2]}</p>
                    ))}
                </div>
                <div>
                    <input id="chatMessage" type="input" onKeyDown={e => InvokeButtonClickOnEnter(e)} />

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
}

function InvokeButtonClickOnEnter(event) {
    if (event.keyCode == 13) {
        document.getElementById("chatMessageButton").click();
    }
}

//<p key={msgs[i] + i}>{msgs[i][0] + ": " + msgs[i][1]}</p>
function GetMessages(msgs) {
    let result = [];
    for (let i = 0; i < msgs.length; i++) {
        result.push([msgs[i] + i, msgs[i][0], msgs[i][1]]);
    }
    return result;
}

export default ChatWindow;
