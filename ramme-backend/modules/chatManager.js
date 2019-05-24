const mongoose = require("mongoose");

let messageScheme = { sessionid: String, name: String, message: String };

const Message = mongoose.model("chatmessages", messageScheme);

function getMessages(req, res) {
    mongoose.connect("mongodb+srv://root:rammemongo@rammecluster-qhhyz.mongodb.net/rammedb?retryWrites=true", { useNewUrlParser: true });

    //TODO: only take message in the group of current id
    Message.find({}, (err, messages) => {
        if (err) console.log(err);

        res.send({ messages: messages.map(x => [x.name, x.message]) });
    });
}

function sendMessage(req, res) {
    mongoose.connect("mongodb+srv://root:rammemongo@rammecluster-qhhyz.mongodb.net/rammedb?retryWrites=true", { useNewUrlParser: true });

    let message = new Message({ sessionid: req.session.id, name: req.session.name, message: req.body.message });
    message.save(err => {
        res.send({ result: "OK" });
    });
}

exports.getMessages = getMessages;
exports.sendMessage = sendMessage;
