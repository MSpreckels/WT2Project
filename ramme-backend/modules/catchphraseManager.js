const mongoose = require("mongoose");
const sessionManager = require("./sessionManager");

let catchphraseScheme = { text: String };

const Catchphrase = mongoose.model("catchphrases", catchphraseScheme);

async function getCatchphrases(req, res) {
  if (await sessionManager.validateSession(req)) {
    mongoose.connect(
      "mongodb+srv://root:rammemongo@rammecluster-qhhyz.mongodb.net/rammedb?retryWrites=true",
      { useNewUrlParser: true }
    );

    Catchphrase.find({}, (err, catchphrases) => {
      if (err) console.log(err);

      res.send({
        catchphrases: catchphrases.map(x => [
          x.text
        ])
      });
    });
  }
}

/*async function sendCatchphrases(req, res) {
  if (await sessionManager.validateSession(req)) {
    mongoose.connect(
      "mongodb+srv://root:rammemongo@rammecluster-qhhyz.mongodb.net/rammedb?retryWrites=true",
      { useNewUrlParser: true }
    );

    let testPhrase = new Catchphrase({
      text: "Das ist ein Test."
    });
    testPhrase.save(err => {
      if (err) res.status(500).send({ text: "catchphrase could not be send " });
      res.status(201).send({ text: "catchphrase send" });
    });
  }
}*/

exports.getCatchphrases = getCatchphrases;
//exports.sendCatchphrases = sendCatchphrases;