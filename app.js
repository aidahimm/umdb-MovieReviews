const express = require('express');
const app = express();
const mongoose = require('mongoose');
const neo4j = require ('neo4j-driver');
// const db = require ('./data/models')

//Support the form-urlencoded format for the request body
app.use(express.urlencoded({extended: true}));
//Support JSON format for req/res
app.use(express.json());

//synchronize models with the database

//listen on port
app.get('/', (req,res)=>{
    session
        .run("MATCH(n) RETURN (n)")
        .then(function(result){
            res.send(result)
        })
        .catch(function(err){
            console.log(err);
        })
    // res.send("Home Page");
});

let neo = new neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '123'));
let session = neo.session();

mongoose.connect('mongodb://localhost:27017/', () =>
    console.log('Connected to MongoDb!')
);

app.listen(3000);
//Routes for everything related to apis
//Not to keep this file crowded
// const apiRoutes = require("./routes/apiRoutes");
// app.use('/api', apiRoutes);

// Testing the Databases connection










