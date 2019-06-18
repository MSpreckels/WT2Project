const fs = require("fs");
const uuid = require("uuid/v4");
const mongoose = require("mongoose");
const url = "mongodb://localhost/rammeDb";
// "mongodb+srv://root:rammemongo@rammecluster-qhhyz.mongodb.net/rammedb?retryWrites=true";
let sessionScheme = {
  _id: String,
  expires: Date,
  session: {
    cookie: {
      originalMaxAge: Number,
      expires: Date,
      secure: Boolean,
      httpOnly: Boolean,
      domain: String,
      path: String,
      sameSite: Boolean
    },
    securityToken: String,
    name: String
  }
};
const Sessions = mongoose.model("sessions", sessionScheme);
const randomNameGenerator = require("./randomName");

function initializeSession(req, res, next) {
  if (!req.session.securityToken && !req.session.name) {
    req.session.securityToken = uuid();
    req.session.name = randomNameGenerator();
  }
  next();
}

async function validateSession(req) {
  mongoose.connect(url, { useNewUrlParser: true });
  try {
    var query = await Sessions.findOne({
      _id: req.session.id
    });
    return query.session.securityToken === req.session.securityToken;
  } catch (error) {
    //console.error(error);
  } finally {
  }
}

async function getName(_id) {
  mongoose.connect(url, { useNewUrlParser: true });
  try {
    var query = await Sessions.findOne({
      _id: _id
    });

    return query.session.name;
  } catch (error) {
    //console.error(error);
  }
}

exports.getName = getName;
exports.validateSession = validateSession;
exports.initializeSession = initializeSession;
