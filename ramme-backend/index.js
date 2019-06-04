const express = require("express");
const bodyParser = require("body-parser");
const temmplateData = require("./ressources/templatedata.json");
const session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
const sessionManager = require("./modules/sessionManager");
const chatManager = require("./modules/chatManager");
const partyManager = require("./modules/partyManager");
const cors = require("cors");

var whitelist = ["http://localhost:3000", "http://m-spreckels.net"];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

const app = express();
var store = new MongoDBStore({
  uri:
    "mongodb+srv://root:rammemongo@rammecluster-qhhyz.mongodb.net/rammedb?retryWrites=true",
  collection: "sessions"
});

store.on("error", function(error) {
  console.log(error);
});

app.use(cors(corsOptions));

app.use(
  session({
    secret: "Shh, its a secret!",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);
app.use(sessionManager.initializeSession);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log(req.hostname);
  res.redirect("http://" + req.hostname + ":5000");
});

app.get("/api/messages", chatManager.getMessages);
app.post("/api/messages", chatManager.sendMessage);

app.get("/api/locations", (req, res) => {
  res.send(temmplateData.locations);
});

app.get("/api/catchphrases", (req, res) => {
  res.send(temmplateData.catchphrases);
});

app.post("/api/parties", (req, res) => {
  res.send(
    partyManager.addToParty(
      req.body.location,
      req.body.time,
      req.body.sessionId
    )
  );
});

app.delete("/api/parties", partyManager.deleteFromParty);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
