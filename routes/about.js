const express = require('express');
const router = express.Router();
const path = require('path');



router.get('/', function (req, res) {


    res.render('pages/about');


})




module.exports = router;