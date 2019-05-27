const mongoose = require("mongoose");
const sessionManager = require("./sessionManager");

let messageScheme = { sessionid: String, name: String, message: String };

const Message = mongoose.model("chatmessages", messageScheme);

async function getMessages(req, res) {
  if (await sessionManager.validateSession(req)) {
    mongoose.connect(
      "mongodb+srv://root:rammemongo@rammecluster-qhhyz.mongodb.net/rammedb?retryWrites=true",
      { useNewUrlParser: true }
    );

    //TODO: only take message in the group of current id
    Message.find({}, (err, messages) => {
      if (err) console.log(err);

      res.send({ messages: messages.map(x => [x.name, x.message]) });
    });
  }
}

async function sendMessage(req, res) {
  if (await sessionManager.validateSession(req)) {
    mongoose.connect(
      "mongodb+srv://root:rammemongo@rammecluster-qhhyz.mongodb.net/rammedb?retryWrites=true",
      { useNewUrlParser: true }
    );

    let message = new Message({
      sessionid: req.session.id,
      name: req.session.name,
      message: req.body.message
    });
    message.save(err => {
      //console.log(message);
    });
    res.status(200).send({ message: "Message send" });
  }
}

exports.getMessages = getMessages;
exports.sendMessage = sendMessage;
