const mongoDriver = require("../../Mongo");

async function getUser(){
    try {
        // Connect to the MongoDB cluster
        let db = await mongoDriver.mongo();
        return await db.collection("users").findOne({userID: "ahim"});
    } catch (e) {
        console.log(e);
    }
}


module.exports = {getUser};

