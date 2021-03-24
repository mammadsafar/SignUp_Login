const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', function (req, res) {


    res.render('pages/home');

})




module.exports = router;