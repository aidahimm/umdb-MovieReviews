const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.send("UMDb: Movie Reviews");
});

module.exports = router;