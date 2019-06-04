const url = "mongodb://localhost:27017/mongo-db-test";
const ObjectID = require("mongodb").ObjectID;
const mongoose = require("mongoose");
const partySchema = {
  location: String,
  time: String,
  members: [String]
};
const Parties = mongoose.model("parties", partySchema);

async function addToParty(p_location, p_time, p_idMember) {
  let party = {};

  mongoose.connect(url, { useNewUrlParser: true });

  party = await Parties.findOneAndUpdate(
    {
      location: p_location,
      time: p_time,
      $expr: { $lt: [{ $size: "$members" }, 4] }
    },
    { $push: { members: p_idMember } },
    { new: true, useFindAndModify: false }
  );

  console.log(party);

  if (party == null) {
    party = await Parties.create({
      location: p_location,
      time: p_time,
      members: [p_idMember]
    });
  }

  return party;
}

async function deleteFromParty(p_idPartyHex, p_idMember) {
  const objectIdParty = new ObjectID(p_idPartyHex);
  let party = {};
  mongoose.connect(url, { useNewUrlParser: true });

  party = await Parties.findOneAndUpdate(
    {
      _id: objectIdParty
    },
    {
      $pull: { members: p_idMember }
    },
    {
      new: true,
      useFindAndModify: false
    }
  );

  console.log(party);

  if (party.members.length == 0) {
    let delObject = await dbo.collection("parties").deleteOne({
      _id: objectIdParty
    });
  }

  return party;
}

exports.addToParty = addToParty;
exports.deleteFromParty = deleteFromParty;
