'use strict';
var express = require('express')
var router = express.Router()
var path = require("path")
var util = require('util')

var multer = require('multer')

const upload = multer({ storage: multer.memoryStorage() })

router.get('/', function (req, res) {

    try {
        if (!req.session.collection) {
            req.session.collection = []
        }
        if (!req.session.main) {
            req.session.main = []
        }
        if (!req.session.extra) {
            req.session.extra = []
        }
        if (!req.session.side) {
            req.session.side = []
        }


        res.render('deckbuilder', { collection: req.session.collection, mainCards: req.session.main, sideCards: req.session.side, extraCards: req.session.extra });
    } catch (error) {
        console.log(error)
    }

});

router.post('/importDeck', upload.single('file'), function (req, res) {
    try {
        const parsedYdk = parse(req.file.buffer)
        req.session.main =parsedYdk[0]
        req.session.extra = parsedYdk[1]
        req.session.side = parsedYdk[2]
        res.redirect('/builder')
    } catch (error) {
        console.log(error)
    }
})

router.post('/importCollection', upload.single('file'), function (req, res) {
    try {
        const parsedYdk = parse(req.file.buffer)
        req.session.collection = req.session.collection.concat(parsedYdk[0], parsedYdk[1], parsedYdk[2])
        res.redirect('/builder')
    } catch (error) {
        console.log(error)
    }
})


function parse(file) {
    console.log("Entry")
    try {
        var data = String(file)
        data = data.split(/\r?\n|\r/).map(x => x.trim()).filter(id => id.length > 0)
        var extraSeparator = data.indexOf("#extra")
        var sideSeparator = data.indexOf("!side")
        return [data.slice(1, extraSeparator), data.slice(sideSeparator + 1, data.length), data.slice(extraSeparator + 1, sideSeparator)]
    } catch (error) {
        console.log(error)
    }
}

module.exports = router;
