const fs = require("fs");
const uuid = require("uuid/v4");

function getSession(req, res) {
  fs.readFile("./ressources/sessions.json", (err, data) => {
    let sessions = JSON.parse(data).sessions;
    if ((session = sessions.find(element => element.id === req.session.id))) {
      if (req.session.securityToken === session.securityToken)
        res.send(`Hallo : ${req.session.name}`);
    } else {
      req.session.securityToken = uuid();
      req.session.name = "test";
      sessions.push({
        id: req.session.id,
        securityToken: req.session.securityToken,
        name: req.session.name
      });

      let data = JSON.stringify({ sessions: sessions }, null, 2);
      fs.writeFile("./ressources/sessions.json", data, err => {
        if (err) console.log(err);
        res.send(req.session);
      });
    }
  });
}

exports.getSession = getSession;
