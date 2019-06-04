const url =
  "mongodb+srv://root:rammemongo@rammecluster-qhhyz.mongodb.net/rammedb?retryWrites=true";
const ObjectID = require("mongodb").ObjectID;
const mongoose = require("mongoose");
const partySchema = {
  location: String,
  time: Date,
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

  if (party == null) {
    party = await Parties.create({
      location: p_location,
      time: p_time,
      members: [p_idMember]
    });
  }

  console.log(party);

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

  if (party.members.length == 0) {
    let delObject = await Parties.deleteOne({
      _id: objectIdParty
    });
    party = {};
  }

  console.log(party);

  return party;
}

exports.addToParty = addToParty;
exports.deleteFromParty = deleteFromParty;
