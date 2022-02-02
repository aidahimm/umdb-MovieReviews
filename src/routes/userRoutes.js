const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/user', (req,res)=>{
    userController.getUser(req,res).then();
});

module.exports = router;