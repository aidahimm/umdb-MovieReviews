const express = require('express');
const router = express.Router();
//
const neo4j_calls = require('./../neo4j_api');
//
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
//
router.delete('/delreview', (req,res)=>{
    reviewController.deleteReview(req,res).then();
});
//
router.get('/admis', (req,res)=>{
    reviewController.getAdmis(req,res).then();
});
//most_followed_watchlists
router.get('/most_followed_watchlists', async (req, res, next) => {
    try {
        const username = req.body.username;
        const result = await neo4j_calls.most_followed_watchlists(username);
        console.log(`most followed watchlists are:  ${result} `);
        res.status(200).send({ result })
        return { result };
    } catch (error) {
        console.log(error);
    }
})
//
//most_active_users
router.get('/most_active_users', async (req, res, next) => {
    try {
        const username = req.body.username;
        const result = await neo4j_calls.most_active_users(username);
        console.log(`most active users are:  ${result} `);
        res.status(200).send({ result })
        return { result };
    } catch (error) {
        console.log(error);
    }
})
//user_owns_watchlist
router.get('/user_owns_watchlist', async (req, res, next) => {
    try {
        const username = req.body.username;
        const result = await neo4j_calls.user_owns_watchlist(username);
        console.log(`Watchlists owned by User are  ${result} `);
        res.status(200).send({ result })
        return { result };
    } catch (error) {
        console.log(error);
    }
})

//All relationships that are stated in the slides
router.get('/suggested_users', async (req, res, next) => {
    try {
        const username = req.body.username;
        const result = await neo4j_calls.suggested_users(username);
        console.log(`Suggested Users  ${result} `);
        res.status(200).send({ result })
        return { result };
    } catch (error) {
        console.log(error);
    }
})
//users_own_watchlist
router.get('/users_own_watchlist', async (req, res, next) => {
    try {
        const result = await neo4j_calls.suggested_watchlist();
        console.log(`Suggested watchlists ${result} `);
        res.status(200).send({ result })
        return { result };
    } catch (error) {
        console.log(error);
    }
})
//
router.get('/suggested_watchlist', async (req, res, next) => {
    try {
        const result = await neo4j_calls.suggested_watchlist();
        console.log(`Suggested watchlists ${result} `);
        res.status(200).send({ result })
        return { result };
    } catch (error) {
        console.log(error);
    }
})    
//
router.post('/user_rating_movie', async (req, res, next) => {
    try {
        const user_name = req.body.user_name;
        const movie_name= req.body.movie_name;
        const rating=req.body.rating;
        const result = await neo4j_calls.user_rating_movie(user_name,movie_name,rating);
        res.json(result);
        console.log(`User  ${user_name} rates movie ${movie_name} with value ${rating}`);
    } catch (error) {
        console.log(error);
    }
})
//
router.post('/user_follow_watchlist', async (req, res, next) => {
    try {  
        const username = req.body.username;
        const watchlist_name= req.body.watchlist_name;
        const result = await neo4j_calls.user_follow_watchlist(username,watchlist_name);
        res.json(result);
        console.log(`User  ${username} starts following user${watchlist_name} created`);
    } catch (error) {
        console.log(error);
    }
})
//
router.post('/user_create_watchlist', async (req, res, next) => {
    try {
        const user_name = req.body.user_name;
        const watchlist_name= req.body.watchlist_name;
        const result = await neo4j_calls.user_create_watchlist(user_name,watchlist_name);
        res.json(result);
        console.log(`User ${user_name} has created watchlist ${watchlist_name}`);
    } catch (error) {
        console.log(error);
    }
})
//
router.post('/user_follow_user', async (req, res, next) => {
    try {
        const username_1 = req.body.username_1;
        const username_2= req.body.username_2;
        const result = await neo4j_calls.user_follow_user(username_1,username_2);
        res.json(result);
        console.log(`User  ${username_1} starts following user${username_2} created`);
    } catch (error) {
        console.log(error);
    }
})
///// count_all_nodes 
router.get('/count_all_nodes', async function (req, res, next) {
    let result = await neo4j_calls.count_all_nodes();
    console.log("All nodes are", result)
    res.status(200).send({ result })    //Can't send just a Number; encapsulate with {} or convert to String.
    return { result };
})
//count_all_user
router.get('/count_all_user', async function (req, res, next) {
    let result = await neo4j_calls.count_all_user();
    console.log("Total Users:", result)
    res.status(200).send({ result })    //Can't send just a Number; encapsulate with {} or convert to String.
    return { result };
})
//
//count_all_movie
router.get('/count_all_movie', async function (req, res, next) {
    let result = await neo4j_calls.count_all_movie();
    console.log("All Movies are", result)
    res.status(200).send({ result })    //Can't send just a Number; encapsulate with {} or convert to String.
    return { result };
})
///count_all_watchlist
router.get('/count_all_watchlist', async function (req, res, next) {
    let result = await neo4j_calls.count_all_watchlist();
    console.log("All Watchlists are", result)
    res.status(200).send({ result })    //Can't send just a Number; encapsulate with {} or convert to String.
    return { result };
})
//
//test the post methods now 
router.post('/add_user', async (req, res, next) => {
    try {
        const username = req.body.name;
        const result = await neo4j_calls.add_user(username);
        res.json(result);
        console.log(`Username ${username} created`);
    } catch (error) {
        console.log(error);
    }
})
//
router.post('/add_movie', async (req, res, next) => {
    try {
        const movie_name = req.body.name;
        const result = await neo4j_calls.add_movie(movie_name);
        res.json(result);
        console.log(`Movie ${movie_name} created`);
    } catch (error) {
        console.log(error);
    }
})
//
router.post('/add_watchlist', async (req, res, next) => {
    try {
        const watchlist_name = req.body.watchlist_name;
        const tracks= req.body.tracks;
        const result = await neo4j_calls.add_watchlist(watchlist_name,tracks);
        res.json(result);
        console.log(`Watchlist  ${watchlist_name} created`);
    } catch (error) {
        console.log(error);
    }
})
// https://github.com/Ortee/neo4j-docker-express-api/blob/master/server/index.js
// https://github.com/neo4j-examples/nodejs-neo4j-realworld-example
module.exports = router;