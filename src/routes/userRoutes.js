const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/uid', (req,res)=>{
    userController.findUserByUsername(req,res).then();
});

router.post('/uName', (req,res)=>{
    userController.findUserByNameAndSurname(req,res).then();
});

router.post('/uCtry', (req,res)=>{
    userController.findUsersByCountry(req,res).then();
});

router.post('/urNf', (req,res)=>{
    userController.findUsersByNFollowers(req,res).then();
});

router.post('/regusr', (req,res)=>{
    userController.registerUser(req,res).then();
});

router.post('/login', (req,res)=>{
    userController.loginUser(req,res).then();
});

router.put('/updusr', (req,res)=>{
    userController.updateUserProfile(req,res).then();
});

router.delete('/delusr', (req,res) =>{
    userController.deleteUser(req,res).then();
});

module.exports = router;