const fs = require("fs");
const uuid = require("uuid/v4");

const randomNameGenerator = require("./randomName");

function getSession(req, res) {
  fs.readFile("./ressources/sessions.json", (err, data) => {
    let sessions = JSON.parse(data).sessions;
    if (
      (session = sessions.find(
        element => element.securityToken === req.session.securityToken
      ))
    ) {
      console.log(req.session);
      res.send(req.session);
    } else {
      req.session.securityToken = uuid();
      req.session.name = "test";
      sessions.push(req.session);

      let data = JSON.stringify({ sessions: sessions }, null, 2);
      fs.writeFile("./ressources/sessions.json", data, err => {
        if (err) console.log(err);
        console.log(req.session);
        res.send(req.session);
      });
    }
  });
}

exports.getSession = getSession;
