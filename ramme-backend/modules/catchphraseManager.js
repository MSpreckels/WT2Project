const mongoose = require("mongoose");
const sessionManager = require("./sessionManager");

let catchphraseScheme = { text: String };
const url =
  "mongodb+srv://root:rammemongo@rammecluster-qhhyz.mongodb.net/rammedb?retryWrites=true";
const Catchphrase = mongoose.model("catchphrases", catchphraseScheme);
async function getCatchphrases(req, res) {
  if (await sessionManager.validateSession(req)) {
    mongoose.connect(url, { useNewUrlParser: true });

    Catchphrase.find({}, (err, catchphrases) => {
      if (err) console.log(err);

      res.send({
        catchphrases: catchphrases.map(x => [x.text])
      });
    });
  }
}

exports.getCatchphrases = getCatchphrases;
//exports.sendCatchphrases = sendCatchphrases;
