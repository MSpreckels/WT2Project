const fs = require("fs");
const uuid = require("uuid/v4");
const randomNameGenerator = require("./randomName");

//takes request and respond as paramaeter
function getSession(req, res) {
    fs.readFile("./ressources/sessions.json", (err, data) => {
        if (err) {
            //Wenn error dann sende error im respond
            res.send(err);
        } else {
            let sessions = JSON.parse(data).sessions; // parse sessions in sessions
            if ((session = sessions.find(element => element.id === req.session.id))) {
                // suche session in json objekt (später dann db)
                if (req.session.securityToken === session.securityToken) {
                    //überprüfe securityToken
                    res.send({ session: { name: session.name } });
                } // wenn korrekt, dann sende session
                else res.send({ error: "Ungültige Session" }); // wenn nicht, dann sende error
            } else {
                //Fülle session mit infos
                let session = { id: "", securityToken: "", name: "" };

                session.id = req.session.id; //setze id in session object auf request session id

                session.securityToken = uuid(); // setze securityToken in session Object
                session.name = randomNameGenerator(); // setze namen in session Object

                req.session.securityToken = session.securityToken; // setze securityToken in request session Object
                req.session.name = session.name; // setze namen in request session Object

                sessions.push(session); // update sessions (Das ist eine Liste!)

                let newData = JSON.stringify({ sessions: sessions }, null, 2);
                fs.writeFile("./ressources/sessions.json", newData, err => {
                    if (err) res.send(err);
                    //falls schreiben misslungen, sende fehler
                    else {
                        res.send({ session: { name: session.name } });
                    } // falls gelungen sende session
                });
            }
        }
    }); // lese json file
}
exports.getSession = getSession;
