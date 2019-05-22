import React, { Component } from "react";

class ChatWindow extends Component {
    state = {};

    render() {
        //return <img src={chat} alt="Chat" className="center" />;
        return (
            <div>
                <table>
                    <tbody>
                        {this.props.messages.map(x => (
                            <tr>{x[0] + ": " + x[1]}</tr>
                        ))}
                        <tr>
                            <td>
                                <input id="chatMessage" type="input" />
                            </td>
                            <td>
                                <button onClick={() => this.props.onSendMessage(document.getElementById("chatMessage").value)}>Send</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ChatWindow;
