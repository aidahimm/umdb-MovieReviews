const mongoDriver = require("../../Mongo");

async function getReview(){
    try {
        // Connect to the MongoDB cluster
        let db = await mongoDriver.mongo();
        return await db.collection("reviews").findOne({reviewer: "raeldor-96879"});
    } catch (e) {
        console.log(e);
    }
}


module.exports = {getReview};

