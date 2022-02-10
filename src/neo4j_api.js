let neo4j = require('neo4j-driver');
let {creds } = require("./../config/noe4jcredentials");
let neo4jdbconnection = neo4j.driver(creds.bolt_url, neo4j.auth.basic(creds.neo4j_username, creds.neo4j_password));
//////// get
async function count_all_nodes() {
    let session = neo4jdbconnection.session();
    const num_nodes = await session.run('MATCH (n) RETURN n', {
    });
    session.close();
    console.log("RESULT", (!num_nodes ? 0 : num_nodes.records.length));
    return (!num_nodes ? 0 : num_nodes.records.length);
};

///add relationships between users. post
async function userFollowsUser(user1,user2){
    let session = neo4jdbconnection.session();
    let result= await session.run(
    `MATCH (user1:User { name:"${user1}"}), (user1:User { name:  "${user2}"} " }) CREATE (user1)-[:FOLLOWS]->(user1)`
);
}
/////////*****************************************///////////
///////        Getter methods          //////////////////////
////////*****************************************///////////
//// get single user by name
async function get_single_user_by_name(){
    let session = neo4jdbconnection.session();

}
//add user
async function add_user (personName) {
    let session = neo4jdbconnection.session();
    try {
       let result= await session.run(
               `MERGE (n:User {name: "${personName}"}) RETURN n`
        );
     return result;
    }
    catch(err){
        console.error('cant create user due to', err);
        //return result;
    }
}
//add movie

async function add_movie (movieID) {
    let session = neo4jdbconnection.session();
    try {
       let result= await session.run(
               `MERGE (n:Movie {name: "${movieID}"}) RETURN n`
        );
     return result;
    }
    catch(err){
        console.error('cant add movie due to', err);
        //return result;
    }
}


//add watchlist(?)



/// get multiple users by name
async  function get_multiple_user_by_name(){
    let session = neo4jdbconnection.session();
    
}
/// get the total nuber of folloers of a user
async function get_total_followers(userid){
    let session=neo4jdbconnection.session();
    try{
        const results =await session.run(
            `MATCH(u:User{id:"${userid}"})<-[FOLLOWS]-() RETURN COUNT(FOLLOWS) AS FOLLOWERS `
        );
        return results.records.map((r)=>{
        const numfollowers=r.get('FOLLOWERS')
        return numfollowers.low
        })
    }
    catch(err){
        console.error('Cant get the total users due to ',err);

    }
}
// users like a movie





//user follows user




//a user's watchlist



//delete all nodes form neo4j databse
async function delete_all_nodes(){
const session=neo4jdbconnection.session();
try{
    const results=await session.run(
    `MATCH(n) DETACH DELETE (n)`
    )
    return 'All nodes are deleted successfully';
}
catch( err){
    console.error('Cant delete the all noded due to ', err);
}
}
//delete an individual user
async function delete_single_user(userid){
    const session =neo4jdbconnection.session();
    const result =await  session.run(
        `MATCH(u:User{}) RETURN `
    )

}
///
//app.post('/api/know', function(req, res) {
  //  req.accepts('application/json');
    //db.cypherQuery('MATCH (a:Person { name: "' + req.body.name1 + '" }), (b:Person { name: "' + req.body.name2 + '" }) CREATE (a)-[:KNOWS]->(b)',
      //{}, function(err) {
        //err != true ?
        //res.status(201).send() :
        //res.status(404).send();
      //});
  //});
///remove a person
module.exports = {
    count_all_nodes,
    add_user,
    add_movie,
    add_watchlist,
    add_relationship_users,

    get_single_user_by_name,
    get_multiple_user_by_name,

    update_user,
    update_movie,

    delete_all_nodes,
    delete_single_user,

    delete_single_movie,
    user_unfollow_user,
    get_total_followers,
    
};