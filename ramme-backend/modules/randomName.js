const fs = require("fs");
const names = require("../ressources/names.json").names;

function getRandomName() {
  return names[Math.floor(Math.random() * names.length)];
}
module.exports = getRandomName;
