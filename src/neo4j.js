const {Neo4jClient} = require("neo4j-driver");
let neo_client = null;

let neo_driver = new neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '123'));
let neo_session = neo_driver.session(); //

async function neo4jNode() {
    if (neo_client == null) {

        const neo_uri = neo_driver;
        neo_client = new neo_client(uri);
        await neo_client.connect();
        return neo_client.db('umdbMovies');

    } else return neo_client.db('umdbMovies');
}

function getNode(collection) {
    if (neo_client == null)
        throw new Error("Node doesn't exist.");
    else
        return neo_client.database.(collection);
}

function close(){
    if (client == null)
        throw new Error("No such grpah/node exist.");
    else
        client.close();
}
module.exports = {neo4jNode, getNode, close}