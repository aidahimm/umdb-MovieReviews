//
const { name } = require('ejs');
const express = require('express');
const app = express();
const neo4j = require ('neo4j-driver');

//Bring all the route files here and assign to variables.
const apiRoutes = require("./routes/apiRoutes");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const adminsRoutes = require("./routes/adminsRoutes");

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
});
//for Admins
app.get('/admins',(req, res) => {
    res.render('admins', { Title: 'Admins'});
});
app.get('/profile',(req, res) => {
    res.render('profile', { Title: 'Your Profile'});
});

app.use('/mov', movieRoutes);
app.use('/usr', userRoutes);
app.use('/admins', adminsRoutes);

// call  the apiRoute here
app.use('', apiRoutes);
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
// Connecting to Databases
//Neo4j
//let neo = new neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '123'));
//let session = neo.session();
//listen on port
app.listen(3000);
console.log("Server atarted at port 3000");
module.exports = app;