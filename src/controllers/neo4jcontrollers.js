// ******************************************
//              Connect to Neo4j Database
// ******************************************
let neo4j = require('neo4j-driver');
let {creds } = require("./../config/noe4jcredentials");
let neo4jdbconnection = neo4j.driver(creds.bolt_url, neo4j.auth.basic(creds.neo4j_username, creds.neo4j_password));
//************************************************ */

//??
async function deleteMovie(req, res) {
    try {
        await moviesService.deleteMovie(req.body.movieID);
        return res.status(200).json({ message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}