const express = require('express');
const router = express.Router();

const reviewController = require("../controllers/reviewController");

router.get('/review', (req,res)=>{
    reviewController.getReview(req,res).then();
});
router.get('/admis', (req,res)=>{
    reviewController.getAdmis(req,res).then();
});
///Neo4j Routes/
//const express = require('express');
//const { use } = require('../app');
//const router = express.Router();
const neo4j_calls = require('./../neo4j_api');
/////
//router.get('/', async function (req, res, next) {
  //  res.status(200).send("Root Response from :8080/test_api")
   // return 700000;
//})
/////
router.get('/neo4j_get', async function (req, res, next) {
    let result = await neo4j_calls.get_num_nodes();
    console.log("RESULT IS", result)
    res.status(200).send({ result })    //Can't send just a Number; encapsulate with {} or convert to String.     
    return { result };
})
/////
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
//module.exports = router;
////
module.exports = router;