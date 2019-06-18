const mongoose = require("mongoose");
const sessionManager = require("./sessionManager");

const url =
  "mongodb+srv://root:rammemongo@rammecluster-qhhyz.mongodb.net/rammedb?retryWrites=true";

let messagesScheme = {
  partyID: Number,
  messages: [{sessionid: String,
  name: String,
  message: String,
  timestamp: Number}]
};

const Messages = mongoose.model("chatmessages", messagesScheme);

async function getMessages(req, res) {
  if (await sessionManager.validateSession(req)) {
    mongoose.connect(url, { useNewUrlParser: true });

    let messages = {};

    messages = await Messages.findOneAndUpdate(
      {
        partyID: req.session.currentPartyID
      },
      { new: true, useFindAndModify: false }
    );
  
    if (messages == null) {
      messages = await Messages.create({
        partyID: req.session.currentPartyID,
        messages:[]
      });
    }
    else
    {      
      res.send({
        messages: messages.messages.map(x => [
          x.name,
          x.message,
          x.sessionid === req.session.id
        ])
      });
    }
  }
}

async function sendMessage(req, res) {
  if (await sessionManager.validateSession(req)) {
    mongoose.connect(url, { useNewUrlParser: true });

    messages = await Messages.findOneAndUpdate(
      {
        partyID: req.session.currentPartyID
      },
      {
        $push: {messages: {$each: [{sessionid: req.session.id,
          name: req.session.name,
          message: req.body.message,
          timestamp: new Date().getTime()}],
        $sort: {timestamp: -1}}}
      },
      { new: true, useFindAndModify: false }
    );

    if(messages != null)
    {
      global.io
      .in(req.session.currentPartyId)
      .emit("message", [messages.messages[0].name, messages.messages[0].message]);
    }
  }
}

exports.getMessages = getMessages;
exports.sendMessage = sendMessage;
