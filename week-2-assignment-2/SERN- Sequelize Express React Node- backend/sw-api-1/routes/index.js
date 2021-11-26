var models  = require('../models');
var express = require('express');
var router = express.Router();
var utils = require('../utils');
var apiVersion = '1.0.0';

//Required routes
const CardRoute = require('./Card');
const DeckRoute = require('./Deck');
const FactionRoute = require('./Faction');

//Registered routes
router.use('/cards', CardRoute);
router.use('/decks', DeckRoute);
router.use('/factions', FactionRoute);

//API start
router.get('/', function(req, res) {
    res.status(200).send({
        message: 'Welcome to the  API - v' + apiVersion,
    });
});

module.exports = router;