const url =
  "mongodb+srv://root:rammemongo@rammecluster-qhhyz.mongodb.net/rammedb?retryWrites=true";
const ObjectID = require("mongodb").ObjectID;
const mongoose = require("mongoose");
const partySchema = {
  location: String,
  timeStart: Number,
  timeEnd: Number,
  members: [String]
};
const Parties = mongoose.model("parties", partySchema);

/**
 * Adds User to existing party matching his time and location
 * and having less than four members, or creates new party
 * for user's time and location
 *
 * @async
 */
async function addToParty(req, res) {
  let party = {};

  let p_location = req.body.location;
  let p_timeStart = req.body.timeStart;
  let p_timeEnd = req.body.timeEnd;
  let p_idMember = req.session.id;

  mongoose.connect(url, { useNewUrlParser: true });

  party = await Parties.findOneAndUpdate(
    {
      location: p_location,
      $expr: { $gte: [p_timeStart, "$timeStart"] },
      $expr: { $lte: [p_timeStart, "$timeEnd"] },
      $expr: { $lt: [{ $size: "$members" }, 4] }
    },
    { $push: { members: p_idMember } },
    { new: true, useFindAndModify: false }
  );

  if (party == null) {
    party = await Parties.create({
      location: p_location,
      timeStart: p_timeStart,
      timeEnd: p_timeEnd,
      members: [p_idMember]
    });
  }

  req.session.currentPartyId = party._id;
  req.session.save();

  console.log(party);
  //console.log({member: party.members});
  res.status(201).send({members: party.members});

  //return {member: party.members};
}

/**
 * Deletes user from party's members array and afterwards
 * deletes party from database, if members array is empty.
 *
 * @async
 * @returns Party object without user or "{}", if party got deleted.
 * @param p_idPartyHex Party ID as Hex string from Mongoose ObjectID
 * @param p_idMember User's session ID
 */
async function deleteFromParty(p_idPartyHex, p_idMember) {
  const objectIdParty = p_idPartyHex;//new ObjectID(p_idPartyHex);
  let party = {};
  mongoose.connect(url, { useNewUrlParser: true });

  /*party = await Parties.findOneAndUpdate(
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
  );*/

  await Parties.findById(objectIdParty, async (err, party) => {
    if(err) console.log(err);
    await party.members.remove(p_idMember);
    if (party.members.length == 0) {
      await Parties.deleteOne({_id: objectIdParty}, (err) => {
        party = {};
      });
    }
  
    console.log(party);
  
    return party;
  });


}

exports.addToParty = addToParty;
exports.deleteFromParty = deleteFromParty;
