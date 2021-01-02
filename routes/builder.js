'use strict';
var express = require('express');
var router = express.Router();
var path = require("path")

/* GET users listing. */
router.get('/', function (req, res) {


    /*if (!req.session.ydk) {
        req.session.ydk = ['1', '2', '3']
    }
    else {
        req.session.ydk.push('1')
    }*/
    res.sendFile(path.join(__dirname,'../views/skull-deckbuilder.html'));
});

module.exports = router;
