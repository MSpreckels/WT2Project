const express = require("express");
const temmplateData = require("./ressources/templatedata.json");

const app = express();
app.get("/", (req, res) => {
  console.log(req.hostname);
  res.redirect("http://" + req.hostname + ":3000");
});

app.get("/api/chat", (req, res) => {
  res.send("Platzhalter für chat");
});

app.get("/api/session", (req, res) => {
  res.send("Platzhalter für Session");
});

app.get("/api/locations", (req, res) => {
  res.send(temmplateData.locations);
});

app.get("/api/catchphrases", (req, res) => {
  res.send(temmplateData.catchphrases);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
