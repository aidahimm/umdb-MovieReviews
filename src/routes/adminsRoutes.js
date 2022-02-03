
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminsController');
var request = require('request');

router.get('/admins', (req,res)=>{
    adminController.getAdmins(req,res).then();
});
router.get('/apimovie', function(req, res) {
    request({
        uri: 'http://www.omdbapi.com/?',
        qs: {
            apikey: '6fe3a4fe',
            i: "tt4154796"
        }
    }).pipe(res);
});
//

module.exports = router;