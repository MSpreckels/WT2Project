const mongoose = require("mongoose");
const sessionManager = require("./sessionManager");

let messageScheme = { sessionid: String, name: String, message: String, timestamp: Number };

const Message = mongoose.model("chatmessages", messageScheme);

async function getMessages(req, res) {
    if (await sessionManager.validateSession(req)) {
        mongoose.connect("mongodb+srv://root:rammemongo@rammecluster-qhhyz.mongodb.net/rammedb?retryWrites=true", { useNewUrlParser: true });

        //TODO: only take message in the group of current id
        Message.find({}, (err, messages) => {
            if (err) console.log(err);

            res.send({
                messages: messages.map(x => [x.name, x.message, x.sessionid === req.session.id])
            });
        });
    }
}

async function sendMessage(req, res) {
    if (await sessionManager.validateSession(req)) {
        mongoose.connect("mongodb+srv://root:rammemongo@rammecluster-qhhyz.mongodb.net/rammedb?retryWrites=true", { useNewUrlParser: true });

        let message = new Message({
            sessionid: req.session.id,
            name: req.session.name,
            message: req.body.message,
            timestamp: new Date().getTime()
        });
        message.save(err => {
            if (err) res.status(500).send({ message: "message could not be send " });

            res.status(201).send({ message: "message send." });
            Message.find()
                .sort("-timestamp")
                .limit(1)
                .exec((err, x) => {
                    if (err) console.log(err);
                    global.io.emit("message", [x[0].name, x[0].message]);
                });
        });
    }
}

exports.getMessages = getMessages;
exports.sendMessage = sendMessage;
