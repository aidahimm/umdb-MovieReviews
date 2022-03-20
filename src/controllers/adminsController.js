
async function getAdmins (req, res) {
    try {
        let admin = await adminServices.getAdmins();
        return res.render('index', { admin: admin, title: 'All Admins' });
        //json({ movie: movie, message: "Service Executed Successfully" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
module.exports = {getAdmins};

//const mongoDriver = require("../../Mongo");

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