'use strict';
var express = require('express')
var router = express.Router()
var path = require("path")
var util = require('util')

var multer = require('multer')

const upload = multer({ storage: multer.memoryStorage() })


/* GET users listing. */
router.get('/', function (req, res) {


    /*if (!req.session.ydk) {
        req.session.ydk = ['1', '2', '3']
    }
    else {
        req.session.ydk.push('1')
    }*/
    res.sendFile(path.join(__dirname, '../public', 'skull-deckbuilder.html'));
});

router.post('/', upload.single('file'), function (req, res) {
    try {
        data = String(req.file.buffer)
        var data = data.split(/\r?\n|\r/).map(x => x.trim()).filter(id => id.length>0)
        console.log(util.inspect(data, { maxArrayLength: null }))

        var extraSeparator = data.indexOf("#extra")
        var sideSeparator = data.indexOf("!side")
        var main = data.slice(1, extraSeparator)
        var extra = data.slice(extraSeparator + 1, sideSeparator)
        var side = data.slice(sideSeparator + 1, data.length)
    } catch (error) {
        console.log(error)
    }

    console.log(main)
    console.log(extra)
    console.log(side)
    try {
        res.render('deckbuilder', { mainCards: main, sideCards: side, extraCards: extra })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
