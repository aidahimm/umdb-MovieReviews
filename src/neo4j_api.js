let neo4j = require('neo4j-driver');
let { creds } = require("./../config/noe4jcredentials");
let neo4jdbconnection = neo4j.driver(creds.bolt_url, neo4j.auth.basic(creds.neo4j_username, creds.neo4j_password));
////////  get
async function count_nodes() {
    let session = neo4jdbconnection.session();
    const num_nodes = await session.run('MATCH (n) RETURN n', {
    });
    session.close();
    console.log("RESULT", (!num_nodes ? 0 : num_nodes.records.length));
    return (!num_nodes ? 0 : num_nodes.records.length);
};
//////// post
 async function create_user (personName) {
    let session = neo4jdbconnection.session();
    //const personName = 'Tesfaye';
    //`MERGE (n:Person {name: "${personName}"}) RETURN n`
    try {
       let result= await session.run(
               `MERGE (n:Person {name: "${personName}"}) RETURN n`
        );
     return result;
    }
    catch(err){
        console.error('cant create user due to', err);
        //return result;
    }
}
///
//add relationships between users. post
async function userFollowsUser(user1,user2){
    let session = neo4jdbconnection.session();
    let result= await session.run(
    `MATCH (user1:Person { name:"${user1}"}), (user1:Person { name:  "${user2}"} " }) CREATE (user1)-[:KNOWS]->(user1)`
);
}


/////////*****************************************///////////
///////        Getter methods          //////////////////////
////////*****************************************///////////
/// get single user by name
async function get_single_user_by_name(){
    let session = neo4jdbconnection.session();

}

// get multiple users by name
async  function get_single_multiple_user_by_name(){
    let session = neo4jdbconnection.session();
    
}
///
async function create_user(personName){
let session = neo4jdbconnection.session();
    try {
       let result= await session.run(
               `MERGE (n:Person {name: "${personName}"}) RETURN n`
        );
     return result;
    }
    catch(err){
        console.error('cant create user due to', err);
        //return result;
    }
} 
///
app.post('/api/know', function(req, res) {
    req.accepts('application/json');
    db.cypherQuery('MATCH (a:Person { name: "' + req.body.name1 + '" }), (b:Person { name: "' + req.body.name2 + '" }) CREATE (a)-[:KNOWS]->(b)',
      {}, function(err) {
        err != true ?
        res.status(201).send() :
        res.status(404).send();
      });
  });

//remove a person

module.exports = {
    count_nodes,
    create_user,get_single_user_by_name,
    get_single_multiple_user_by_name,
    add_relationship_users
};