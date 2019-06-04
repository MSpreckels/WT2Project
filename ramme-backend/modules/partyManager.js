const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const ObjectID = require("mongodb").ObjectID;

async function addToParty(p_location, p_time, p_idMember) {
    
    let party = {};

    MongoClient.connect(url, {useNewUrlParser: true}, 
        function(err, db) 
        {
            if (err) throw err;
        
            const dbo = db.db("mongo-db-test");

            party = await dbo.collection("parties").findOneAndUpdate(
                {
                    location: p_location,
                    time: p_time,
                    $expr: { $lt: [{ $size: "$members" }, 4] }
                },
                { $push: { members: p_idMember } },
                { returnOriginal: false }
            );
        
            if (party.value == null) 
            {
                party = await dbo.collection("parties").insertOne(
                {
                    location: p_location,
                    time: p_time,
                    members: [p_idMember]
                });
            }
            db.close();
        }
    );
    return party.value;
}


async function deleteFromParty(p_idPartyHex, p_idMember) {

    const objectIdParty = new ObjectID(p_idPartyHex);
    let party = {};

    MongoClient.connect(url, {useNewUrlParser: true}, 
        function(err, db) 
        {
            party = await dbo.collection("parties").findOneAndUpdate(
                {
                    _id: objectIdParty
                },
                {
                    $pull: { members: p_idMember }
                },
                {
                    returnOriginal: false
                }
            );
            //console.log(delParty);
            if (party.value.members.length == 0) 
            {let delObject = await dbo.collection("parties").deleteOne({
                    _id: objectIdParty
                });
            }
            db.close();
        }
    );
    return party;
}

exports.addToParty = addToParty;
exports.deleteFromParty = deleteFromParty;
