//Include this Folder in .gitignore! Place required confidential keys / passwords in here.

let neo4j = require('neo4j-driver');
const creds = {
	neo4j_username: "neo4j",
	neo4j_password: "123",
	bolt_url:"bolt://localhost:7687"
}
module.exports = {creds};
