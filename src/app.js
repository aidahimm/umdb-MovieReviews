const express = require('express');
const app = express();
const neo4j = require ('neo4j-driver');
const apiRoutes = require("./routes/apiRoutes");

//Support the form-urlencoded format for the request body
app.use(express.urlencoded({extended: true}));
//Support JSON format for req/res
app.use(express.json());

//Setting a views engine
app.set('view engine', 'ejs');
app.use(express.static('stylesheets'));

//For all routing not to  make this file crowded
app.use('/', apiRoutes);

app.get('/about',(req, res) => {
    res.render('about', { Title: 'About'});
})

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

// Connecting to Databases
//Neo4j
let neo = new neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '123'));
let session = neo.session();

//MongoDb
// let driver = mongoDriver.Mongo();

//listen on port
app.listen(3000);

module.exports = {};










