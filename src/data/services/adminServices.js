const mongoDriver = require("../../Mongo");

async function getAdmins(){
    try {
        // Connect to the MongoDB cluster
        let db = await mongoDriver.mongo();
        return movies = await db.collection("admins").find().limit(10).toArray();
    } catch (e) {
        console.log(e);
    }
}
module.exports = {getAdmins};

