let neo4j = require('neo4j-driver');
let { creds } = require("./../config/noe4jcredentials");
let driver = neo4j.driver(creds.bolt_url, neo4j.auth.basic(creds.neo4j_username, creds.neo4j_password));
///
const request = require("request");
const Movie = require("../models/neo4jmodels"); //import the respective model here.
///add user fucntion
async function addUser(personName){
    //create seesion for the user
    let session = driver.session();
        try {
           let result= await session.run(
                   `MERGE (n:Person {name: "${personName}"}) RETURN n`
            );
         return result;
        }
        catch(err){
            console.error('Cant add a user due to: ', err);    
        }
}
//addMovies function
async function addMovies(){
    try{}
    catch(err ){}
}
///async function
///
module.exports={addUser};