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
}
//
async function count_all_user(){
    const session=neo4jdbconnection.session();
    const num_users=await session.run(
    `MATCH(u:User) RETURN COUNT(u) AS NUM_USERS`
);
session.close();
console.log("Total Users:",(num_users ? 0 : num_users.records.length));
return (! num_users ? 0 : num_users.length);
}
//all movies
async function count_all_movie(){
    const session=neo4jdbconnection.session();
    const num_movies=await session.run(
    `MATCH(m:Movie) RETURN COUNT(m) AS NUM_MOVIES`
);
session.close();
console.log("Total Movies:",(num_movies ? 0 : num_movies.records.length));
return (!num_movies ? 0 : num_movies.length);
}
//all watchlists
async function count_all_watchlist(){
    const session=neo4jdbconnection.session();
    const num_watchlist=await session.run(
    `MATCH(w:Watchlist) RETURN COUNT(w) AS NUM_WATCHLIST`
);
session.close();
console.log("Total Watchlist:",(num_watchlist ? 0 : num_watchlist.records.length));
return (!num_watchlist ? 0 : num_watchlist.length);    

}

// ***************************************************
//                                                    
//    Basic  Relations in the Neo4j Database     *****
//                                                    
// ***************************************************
//user follows user   
async function user_follows_user(user1_id,user2_id){

let session=neo4jdbconnection.session();
    await session.run(
    `MATCH (u1:User{id:"${user1_id}"}),(u2:User{id:"${user2_id}"})
     MERGE(u1)-[:FOLLOWS]->(u2)`
    );
    session.close;
    return `user of id: ${user1_id} starts to Follow user of id:  ${user2_id}`;
}
//
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
//get all of the followers of a user
async function get_total_followers_user(userid){
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
//get all the followres of a watchlist
async function get_total_followers_watchlist(watchlist_id){
    let session=neo4jdbconnection.session();
    try{
        const results =await session.run(
            `MATCH(wl:Watchlist{id:"${watchlist_id}"})<-[FOLLOWS]-() RETURN COUNT(FOLLOWS) AS FOLLOWERS `
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
//get_total_rating_movie
async function get_total_rating_movie(){
    let session=neo4jdbconnection.session();
    try{
        const results =await session.run(
            `MATCH(u:User{id:"${watchlist_id}"})<-[FOLLOWS]-() RETURN COUNT(FOLLOWS) AS FOLLOWERS `
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
//
//delete an individual user node along side its relations from database 
async function delete_user(user_id){
    const session =neo4jdbconnection.session();
    const result =await  session.run(
        `MATCH(u:User{${user_id}) DETACH DELETE u`
    );
    session.close();
    return `a user with id: ${user_id} is deleted.`;
}
//
//delete a movie
async function delete_movie(movie_id){
    const session=neo4jdbconnection.session();
    await session.run(git c
            `MATCH(m:Movie{"${movie_id}"}) DETACH DELETE m`
    );
    session.close();
    return `a movie with id: ${movie_id} is deleted.`;

}
//
//delete a watchlist 
async function delete_watchlist(watchlist_id){
    const session=neo4jdbconnection.session();
    await session.run(
        `MATCH(w:Watchlist{"${watchlist_id}"}) DETACH DELETE w`
    )
    session.close();
    return `a watchlist with id: ${watchlist_id} is deleted.`
}
//
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
async function update_movie(movie_id){
    const session=neo4jdbconnection.session();
    await session.run(
        ``

    );
}
//update watchlist
async function update_watchlist(watchlist_id){
    const session=neo4jdbconnection.session();
    await session.run(
        `MERGE(w:Watchlist({"${watchlist_id}"}))
        SET `
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
    //
    //********************************************* //
    //       Neo4j Queries                         // 
    //********************************************//
    //Query 1:- View suggested Watch List
    //Assumption: to recommened a movie at least two of them should have common watchlist greater than 2
`
    MATCH (u1:User)-[f1:FOLLOWS]->(wl1:Watchlist)<-[f2:FOLLOWS]-(u2:User)-[f2w2:FOLLOWS]->(wl2:Watchlist)
    with u1,u2,count(wl1) AS NumOfSharedWatchlists, 
    COLLECT(wl1) as SharedWatchlists,wl2
    WHERE NOT (u1)-[:FOLLOWS]-> (wl2) AND NumOfSharedWatchlists > 2
    RETURN u1.name AS FirstUser,u2.name AS SecondUser,
    [x IN SharedWatchlists | x.name] AS SharedWatchlists, wl2.name AS RecommendedWatchList
    ORDER BY RecommendedWatchList
    DESC
    LIMIT 5
`
    //Query 2:- View suggested user profiles that follow the same Watchlists you do (follow).
` 
    MATCH(u1:User)-[:FOLLOW]->(wx:Watchlist)<-[:FOLLOW]-(u2:User) 
    with u1.name AS ME, u2.name AS CoFollowerName,COUNT(u2) as NumCommonWatchlist
    RETURN ME ,CoFollowerName, NumCommonWatchlist
    ORDER BY NumCommonWatchlist
    DESC
    LIMIT 16
`
    //Query 3:- View suggested MOVIES based on their occurrence on the Watchlists of users you follow.
`   MATCH (u1:User)-[f1:FOLLOWS]->(u2:User)->[:FOLLOW]-(wx:Watchlist)
    with u1,u2,wx  
    .
    .
    .      
`
    //Query 4:- Retrieve a user’s own watchList.
    // 
    //4.1 To retrive all the watchlist the user is following 
`    MATCH(u1:User)-[f:FOLLOW]->(fw:Watchlist)
        Where NOT (u1)-[:CREATE]->(fw:Watchlist)
        return count(fw) AS WatchlistsYouFollow
`

    //4.2 To retrieve all the watchlist the user has created 
`   MATCH(u1:User{id:{'user_id'}})-[f:CREATE ]->(fc:Watchlist)
    Where NOT (u1)-[:FOLLOW]->(fc:Watchlist)
    return count(fc) AS WatchlistsYouCreate
`
    //Query 5:- Find the most active users based on the number of followers of their watchlists.
    //the active users are in the list 'u1.name'
`   MATCH (u1:User)-[f1]->(w:Watchlist)<-[f2]-(u2:User)
    with *
    WHERE
    type (f1) in ["CREATE"] AND 
    type (f2) in ["FOLLOW"] AND
    NOT (u1)-[:FOLLOW]-(w) AND
    NOT (u2)-[:CREATE]-(w) AND
    RETURN u1.name AS YOU, w.title AS TitleOfYourWatchlist, 
    COLLECT(u2.name) AS WatchlistFollowers, count(f2) AS NumFollowers
    ORDER BY NumFollowers
    DESC
    LIMIT 10
`
    //NB: an analogy of Query 5 can be tested on the movies dataset in the sandbox project
    //[https://sandbox.neo4j.com/]
`   MATCH (u1:Person)-[w]->(m:Movie)<-[ac]-(u2:Person)
    with *
    WHERE 
    type (w) in ["WROTE"] 	  AND 
    type(ac) in ["ACTED_IN"] AND
    NOT (u1)-[:DIRECTED]-(m) AND 
    NOT (u1)-[:PRODUCED]-(m) AND 
    NOT (u2)-[:DIRECTED]-(m) AND 
    NOT (u2)-[:PRODUCED]-(m) AND
    NOT (u2)-[:WROTE]-(m)
    RETURN  u1.name AS YOU,m.title AS TitleOfMovieYouWrote,collect(u2.name) AS ListOfActors, 
    COUNT (ac) AS NumActors
    ORDER BY NumActors
    DESC
    LIMIT 10
`
    //Query 6:- Find the most followed Watch Lists.
`   MATCH(u1:User)-[f]->(wx:Watchlist)
    with *
    where type(f) in ["FOLLOW"] AND NOT type (f) in ["CREATE",""]
    RETURN wx.title AS WatchlistName, COUNT(f) AS NumFollowers
    ORDER BY NumFollowers
    DESC
    LIMIT 10        
`
// I tried the analogy of Query 6 in the Movies dataset, sandbox project [https://sandbox.neo4j.com/].
`   MATCH(p:Person)-[f]-(m:Movie)
    with *
    where type(f) in ["ACTED_IN"] AND NOT type (f) in ["WROTE","REVIEWED","PRODUCED","FOLLOWS","DIRECTED"]
    RETURN m.title AS MovieTitle,COUNT(f) AS NumActors
    ORDER BY NumActors
    DESC
    LIMIT 10
`

    //Query 7:- Find the k top movies with the highest/lowest user ratings.
    // say k=10, the top k movies with highest rating are gonna found by the following Cypher query
    // and the lowest k movies can be found by changing the the ORDER BY from DESC to ASC
    // Hence,for the top k rated movies: 
`
    MATCH(u1:User)-[f]->(wx:Watchlist)
    WITH  *
    WHERE type(f) in ["FOLLOW"] AND NOT type(f) IN ["CREATE","OCCURS_IN"]
    RETURN wx.title AS MovieTitle,wx.rating AS RATING 
    ORDER BY RATING
    DESC
    LIMIT 10

`
//Query 7:- for the lowest k rated movies 
`
    MATCH(p:Person)-[f]->(m:Movie)
    with *
    where type(f) in ["REVIEWED"] AND NOT type(f) in ["WROTE","FOLLOWS","ACTED_IN","DIRECTED","PRODUCED"]
    return m.title AS MovieTitle, f.rating AS RATING ORDER BY RATING
    ASC
    LIMIT 10
`
// the analogy of Query 7 can be found using  the below query
`
    MATCH(p:Person)-[f]->(m:Movie)
    with *
    where type(f) in ["REVIEWED"] AND NOT type(f) in ["WROTE","FOLLOWS","ACTED_IN","DIRECTED","PRODUCED"]
    return m.title AS MovieTitle, f.rating AS RATING ORDER BY RATING
    DESC
    LIMIT 10
`
//app.post('/api/know', function(req, res) {
  //  req.accepts('application/json');
    //db.cypherQuery('MATCH (a:Person { name: "' + req.body.name1 + '" }), (b:Person { name: "' + req.body.name2 + '" }) CREATE (a)-[:KNOWS]->(b)',
      //{}, function(err) {
        //err != true ?
        //res.status(201).send() :
        //res.status(404).send();
      //});
  //});
//You can tweak this code if it works for you
//UNION QUERY SUGGESTED RECIEPES


//
`
MATCH (user:User {id:"61e06691c958cbd19baf4843"}) WITH (user)  CALL { 
MATCH (user)-[:FOLLOWS]->(user2:User)-[:FOLLOWS]->(user3:User), (user3)-[:FOLLOWS]->(:User)-[:LIKES]->(recipe:Recipe)
RETURN 'suggested' as type, recipe.id AS SuggestedRecipes, count(*) AS Strength
UNION  MATCH (user)-[:LIKES]->(:Recipe)<-[:LIKES]-(otherUser:User),
(otherUser)-[:LIKES]->(otherRecipe:Recipe)
RETURN 'otherSuggested' as type, otherRecipe.id AS SuggestedRecipes, count(*) AS Strength
} RETURN type, SuggestedRecipes, Strength ORDER BY Strength DESC

`
module.exports = {
    count_all_nodes,
    add_user,
    add_movie,
    add_watchlist, 

    count_all_user,
    count_all_movie,
    count_all_watchlist,

   update_user,
   update_movie,
   update_watchlist,
   
   delete_user,
   delete_movie,
   delete_watchlist,

   delete_all_nodes,
   delete_all_users,
   delete_all_movie,   
   delete_all_watchlist,

   user_follows_user,
   user_follows_watchlist,
   user_rating_movie,
   user_create_watchlist,

   user_unfollow_user,
   user_unfollow_watchlist,
   user_unrate_movie,
   user_delete_watchlist,

   get_total_followers_user,  
   get_total_followers_watchlist ,
   get_total_rating_movie
};