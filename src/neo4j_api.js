let neo4j = require('neo4j-driver');
let { creds } = require("./../config/noe4jcredentials");
let driver = neo4j.driver(creds.bolt_url, neo4j.auth.basic(creds.neo4j_username, creds.neo4j_password));
/////////  
exports.get_num_nodes = async function () {
    let session = driver.session();
    const num_nodes = await session.run('MATCH (n) RETURN n', {
    });
    session.close();
    console.log("RESULT", (!num_nodes ? 0 : num_nodes.records.length));
    return (!num_nodes ? 0 : num_nodes.records.length);
};
////////
exports.create_user = async function (personName) {
    let session = driver.session();
    //const personName = 'Tesfaye';
    try {
       let result= await session.run(
               `CREATE (n:Person {name: "${personName}"}) RETURN n`
        );
     return result;
    }
    catch(err){
        console.error('cant handle it', err);
        //return result;
    }   
}