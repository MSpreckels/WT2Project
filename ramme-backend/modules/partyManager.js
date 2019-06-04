const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const ObjectID = require("mongodb").ObjectID;

async function addToParty(p_location, p_time, p_idMember) {
    MongoClient.connect(url, {useNewUrlParser: true}, 
        function(err, db) 
        {
            if (err) throw err;
        
            const dbo = db.db("mongo-db-test");

            let partys2 = await dbo.collection("parties").findOneAndUpdate(
                {
                    location: p_location,
                    time: p_time,
                    $expr: { $lt: [{ $size: "$members" }, 4] }
                },
                { $push: { members: p_idMember } },
                { returnOriginal: false }
            );
        
            if (partys2.value == null) 
            {
                partys2 = await dbo.collection("parties").insertOne(
                {
                    location: p_location,
                    time: p_time,
                    members: [p_idMember]
                });
            }
            db.close();
        }
    );
}


async function deleteFromParty(p_idParty, p_idMember) {
    MongoClient.connect(url, {useNewUrlParser: true}, 
        function(err, db) 
        {
            let delParty = await dbo.collection("parties").findOneAndUpdate(
                {
                    _id: p_idParty
                },
                {
                    $pull: { members: p_idMember }
                },
                {
                    returnOriginal: false
                }
            );
            //console.log(delParty);
            if (delParty.value.members.length == 0) 
            {
                let delNotify = await dbo.collection("parties").deleteOne({
                    _id: p_idParty
                });
            }
        }
    );
}

exports.addToParty = addToParty;
exports.deleteFromParty = deleteFromParty;
