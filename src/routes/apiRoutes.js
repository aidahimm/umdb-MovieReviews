const express = require('express');
const router = express.Router();
//
const neo4j_calls = require('./../neo4j_api');
// src\neo4j_api.js
const reviewController = require("../controllers/reviewController");

router.post('/review', (req,res)=>{
    reviewController.getReview(req,res).then();
});

router.post('/crtreview', (req,res)=>{
    reviewController.createReview(req,res).then();
});

router.post('/movrevs', (req,res)=>{
    reviewController.findReviewsByMovie(req,res).then();
});

router.delete('/delreview', (req,res)=>{
    reviewController.deleteReview(req,res).then();
});


//
router.get('/admis', (req,res)=>{
    reviewController.getAdmis(req,res).then();
});

///// Neo4j Routes
//count the number of nodes in the Neo4j database
router.get('/neo4j_get', async function (req, res, next) {
    let result = await neo4j_calls.count_all_nodes();
    console.log("All nodes are", result)
    res.status(200).send({ result })    //Can't send just a Number; encapsulate with {} or convert to String.
    return { result };
})

router.get('/neo4j_', async function (req, res, next) {
    let result = await neo4j_calls.count_all_nodes();
    console.log("All nodes are", result)
    res.status(200).send({ result })    //Can't send just a Number; encapsulate with {} or convert to String.
    return { result };
})
/////
//create a single user in the neo4j database
router.post('/neo4j_post', async (req, res, next) => {
    try {
        const username = req.body.name;
        const result = await neo4j_calls.create_user(username);
        res.json(result);
        console.log(`Username ${username} created`);
    } catch (error) {
        console.log(error);
    }
})
//
// https://github.com/Ortee/neo4j-docker-express-api/blob/master/server/index.js
// https://github.com/neo4j-examples/nodejs-neo4j-realworld-example

module.exports = router;