const { name } = require('ejs');
const express = require('express');
const app = express();
const neo4j = require ('neo4j-driver');
const apiRoutes = require("./routes/apiRoutes");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");

//Support the form-urlencoded format for the request body
app.use(express.urlencoded({extended: true}));
//Support JSON format for req/res
app.use(express.json());

//Views engine
//app.set("views", path_join(__dirname,"views"));
app.set('view engine', 'ejs');
app.use(express.static('stylesheets'));

//For all routing not to  make this file crowded
app.get('/', (req,res)=>{
    res.render('home');
});

app.get('/about',(req, res) => {
    res.render('about', { Title: 'About'});
<<<<<<< HEAD
})
=======
});

app.get('/profile',(req, res) => {
    res.render('profile', { Title: 'Your Profile'});
});

app.use('/mov', movieRoutes);

app.use('/usr', userRoutes);

app.use('', apiRoutes);

>>>>>>> 70d7a0abf53ddf8813596e06def49f6df2042430
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
// Connecting to Databases
//Neo4j
let neo_driver = new neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '123'));
let neo_session = neo_driver.session(); //

//neo_session
//.run("CREATE (a:Person{name:'Menelik Tewodros'},title:'Emperror')")
//.then(function(){
//return neo_session.run("MATCH(a:Person) WHERE a.name='Arthur' RETURN a.name ")
//})
//.then(function(result){
 //   console.log(result.records[0].get(name)+result.records[0].get(title));
//})
//MongoDb
// let driver = mongoDriver.Mongo();
//listen on port
app.listen(3000);
console.log("Server atarted at port 3000");
module.exports = app;