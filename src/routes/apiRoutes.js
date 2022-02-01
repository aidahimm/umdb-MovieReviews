const express = require('express');
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.get('/review', (req,res)=>{
    reviewController.getReview(req,res).then();
});
module.exports = router;