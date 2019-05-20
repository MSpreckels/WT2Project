const fs = require("fs");

function getRandomName() {
    fs.readFile("./ressources/names.json", (err, data) => {
        let names = JSON.parse(data).names;
        return names[Math.floor(Math.random() * names.length)];
    });
}

exports.getRandomName = getRandomName;
