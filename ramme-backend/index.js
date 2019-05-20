const express = require("express");
const temmplateData = require("./ressources/templatedata.json");
const session = require("express-session");
const sessionManager = require("./modules/sessionManager");
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

app.use(cors(corsOptions));

app.use(
    session({
        secret: "Shh, its a secret!",
        resave: false,
        saveUninitialized: true
    })
);

app.get("/", (req, res) => {
    console.log(req.hostname);
    res.redirect("http://" + req.hostname + ":5000");
});

app.get("/api/chat", (req, res) => {
    res.send("Platzhalter für chat");
});

app.get("/api/session", sessionManager.getSession);

app.get("/api/locations", (req, res) => {
    res.send(temmplateData.locations);
});

app.get("/api/catchphrases", (req, res) => {
    res.send(temmplateData.catchphrases);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
