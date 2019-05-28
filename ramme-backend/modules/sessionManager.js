const fs = require("fs");
const uuid = require("uuid/v4");
const mongoose = require("mongoose");
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
  mongoose.connect(
    "mongodb+srv://root:rammemongo@rammecluster-qhhyz.mongodb.net/rammedb?retryWrites=true",
    { useNewUrlParser: true }
  );
  try {
    var query = await Sessions.findOne({
      _id: req.session.id
    });
    return query.session.securityToken === req.session.securityToken;
  } catch (error) {
    console.error(error);
  }
}

exports.validateSession = validateSession;
exports.initializeSession = initializeSession;
