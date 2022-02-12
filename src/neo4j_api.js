// ******************************************
//              Connect to Neo4j Database
// ******************************************
let neo4j = require('neo4j-driver');
let {creds } = require("./../config/noe4jcredentials");
let neo4jdbconnection = neo4j.driver(creds.bolt_url, neo4j.auth.basic(creds.neo4j_username, creds.neo4j_password));
//************************************************ */
//
/////get all nodes in the neo4j databse.
async function count_all_nodes() {
    let session = neo4jdbconnection.session();
    const num_nodes = await session.run('MATCH (n) RETURN n', {
    });
    session.close();
    console.log("RESULT", (!num_nodes ? 0 : num_nodes.records.length));
    return (!num_nodes ? 0 : num_nodes.records.length);
};
// ***************************************************
//                                                    
//    Basic  Relations in the Neo4j Database     *****
//                                                    
// ***************************************************
//user follows user    
async function user_follows_user(user1_id,user2_id){
let session=neo4jdbconnection.session();
    await session.run(
        `MERGE(u1:User{id:"${user1_id}"}) MERGE(u2:User{id:"${user2_id}"}) MERGE(u1)-[rtf:FOLLOWS]->(u1)`
    );
    session.close;
    return `user of id: ${user1_id} starts to Follow user of id:  ${user2_id}`;
}
//user follows a watchlist
async function user_follows_watchlist(user_id,watchlist_id){
let session=neo4jdbconnection.session();
await session.run(
    `MERGE(u:User{"${user_id}"}) MERGE(wl:Watchlist{"${watchlist_id}"}) MERGE(u)-[rtf:FOLLOWS]->(wl)`
);
session.close;
return `user of id: ${user_id} starst to follow a watchlist of id:`;
}
// user rates a movie
async function user_rating_movie(user_id,movie_id){
let session=neo4jdbconnection.session();
await session.run(
   //`MATCH(m:Movie{movie_id:"${movie_id}"})`
    `MERGE(u:User{"${user_id}"}) MERGE(m:Movie"${movie_id}") MERGE(u)-[rtf:RATING]->(m)`
);
session.close; 
return `user of id: ${user_id} rates a movie of id: ${movie_id}`;
}
//user creates watchlist 
async function user_create_watchlist(user_id,watchlist_id){
    let session=neo4jdbconnection.session();
    await session.run(
    `MERGE(u:User{"${user_id}"}) MERGE(w:Watchlist{"${watchlist_id}"}) MERGE(u)-[rtf:CREATES]->(w) `
    );
}
// get single user by name
async function get_single_user_by_name(){
    let session = neo4jdbconnection.session();
    await session.run(


    );
    session.close;
}
//add user node to the databse
async function add_user (personName) {
    let session = neo4jdbconnection.session();
    try {
       let result= await session.run(
               `MERGE (n:User {name: "${personName}"}) RETURN n`
        );
        session.close();
     return result;
    }
    catch(err){
        console.error('cant create user due to', err);
        //return result;
    }
}
//add a movie node  to the neo4j database
async function add_movie (movie_id) {
    let session = neo4jdbconnection.session();
    try {
        await session.run(
               `MERGE (n:Movie {name: "${movie_id}"}) RETURN n`
        );
    session.close();
     return `A movie with id: ${movie_id}  is created`;
    }
    catch(err){
        console.error('cant add movie due to', err);
        //return result;
    }
}
//add a watchlist node to the databse.
async function add_watchlist(watchlistID){
    const session =neo4jdbconnection.session();
    await session.run(
        `MERGE (w:Watchlist{id:"${watchlistID}"} RETURN r) `
     );
     session.close();
     return `A watch list with id ${watchlistID} is created successfully`;
}
//get multiple users by name
async  function get_multiple_user_by_name(){
    let session = neo4jdbconnection.session();   
    await session.run(

    );
    session.close();
}
//get the total all of the followers of a user
async function get_total_followers(userid){
    let session=neo4jdbconnection.session();
    try{
        const results =await session.run(
            `MATCH(u:User{id:"${userid}"})<-[FOLLOWS]-() RETURN COUNT(FOLLOWS) AS FOLLOWERS `
        );
        session.close();
        return results.records.map((r)=>{
        const numfollowers=r.get('FOLLOWERS')
        return numfollowers.low
        })
    }
    catch(err){
        console.error('Cant get the total users due to ',err);
    }
}
//delete an individual user  node from database 
async function delete_user(userid){
    const session =neo4jdbconnection.session();
    const result =await  session.run(
        `MATCH(u:User{${userid}) DELETE u`
    );
    session.close();
}
//delete movie
async function delete_movie(){

}

//user un-follows user
 async function user_unfollow_user(user1_id,user2_id){
    const session=neo4jdbconnection.session();
    await session.run(
        ``

    );
    session.close();
 }
//user un-follows watch list
async function user_unfollow_watchlist(user_id,watchlist_id){
const session=neo4jdbconnection.session();
session.run(
`MATCH(u:User{"${user_id}"})-[rtf:FOLLOW]-(wl:Watchlist{"${watchlist_id}"}) 
delete rtf`
);
}

//user unrate movie
async function user_unrate_movie(){

  
}

//user delete a watchlist
async function user_delete_watchlist(){

}

// update user node details
async function update_user(userid){
const session =neo4jdbconnection.session();
await session.run(
`MERGE (u:User) SET `
);
}

//update movie node details
async function update_movie(){
    const session=neo4jdbconnection.session();
    await session.run(

    );
}



//delete  all  users
async function delete_all_users(){
    const session=neo4jdbconnection.session();


}
// delete_movie,
async function delete_all_movie(){
    const session=neo4jdbconnection.session();
    session.run(
        ``
    );


}
//delete_watchlist
async function delete_watchlist(){
    const session=neo4jdbconnection.session();
    session.run(
        ``

    );
}
//delete_all_watchlist
async function delete_all_watchlist(){
    const session=neo4jdbconnection.session();
    session.run(
        ``
    );

}


//delete all nodes form neo4j databse
async function delete_all_nodes(){
    const session=neo4jdbconnection.session();
    try{
        const results=await session.run(
        `MATCH(n) DETACH DELETE (n)`
        );
        session.close();
        return 'All nodes are deleted successfully';
    }
    catch( err){
        console.error('Cant delete the all noded due to ', err);
    }
    }
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

//You can tweak this code if it works for you
//UNION QUERY SUGGESTED RECIEPES
`MATCH (user:User {id:"61e06691c958cbd19baf4843"}) WITH (user)  CALL { 
    MATCH (user)-[:FOLLOWS]->(user2:User)-[:FOLLOWS]->(user3:User), (user3)-[:FOLLOWS]->(:User)-[:LIKES]->(recipe:Recipe)
RETURN 'suggested' as type, recipe.id AS SuggestedRecipes, count(*) AS Strength
UNION  MATCH (user)-[:LIKES]->(:Recipe)<-[:LIKES]-(otherUser:User),
(otherUser)-[:LIKES]->(otherRecipe:Recipe)
RETURN 'otherSuggested' as type, otherRecipe.id AS SuggestedRecipes, count(*) AS Strength
} RETURN type, SuggestedRecipes, Strength ORDER BY Strength DESC`

module.exports = {
    count_all_nodes,
    add_user,
    add_movie,
    add_watchlist, 

   get_user,
   get_movie,
   get_watchlist,

    update_user,
    update_movie,

    delete_all_nodes,
    delete_user,
    delete_all_users,
    delete_movie,
    delete_all_movie,
    delete_watchlist,
    delete_all_watchlist,

    user_follows_user,
    user_follows_watchlist,
    user_rating_movie,
    user_create_watchlist,

    user_unfollow_user,
    user_unfollow_watchlist,
    user_unrate_movie,
    user_delete_watchlist,

    get_total_followers,    
};