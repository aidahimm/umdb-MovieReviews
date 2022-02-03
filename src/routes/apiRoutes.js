const express = require('express');
const router = express.Router();

const reviewController = require("../controllers/reviewController");

router.get('/review', (req,res)=>{
    reviewController.getReview(req,res).then();
});
router.get('/admis', (req,res)=>{
    reviewController.getAdmis(req,res).then();
});

module.exports = router;