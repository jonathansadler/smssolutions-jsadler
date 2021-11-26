var models  = require('../models');
var express = require('express');
var router = express.Router();
var utils = require('../utils');
const controller = require('../controllers').CardController;
var values = require('./values');


  /**
   * @swagger
   * /api/cards:
   *   get:
   *     description: Returns cards
   *     tags:
   *      - Cards
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: cards
   */

router.get('/', utils.basicAuth(values.read[0], values.read[1]), function(req, res) {
    controller.listAll(req, res);
});

router.get('/search', utils.basicAuth(values.read[0], values.read[1]), function(req, res) {
    controller.searchRecords(req, res);
});


/**
 * @swagger
 * /api/cards/id/{id}:
 *   get:
 *     tags:
 *      - Cards
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         description: Numeric ID of the card to retrieve.
 *         type: integer
 *         minimum: 1
 *     responses:
 *       200:
 *         description: card
 */



router.get('/id/:id', utils.basicAuth(values.read[0], values.read[1]), function(req, res) {
    controller.readRecord(req, res);
});

router.post('/', utils.basicAuth(values.write[0], values.write[1]), function(req, res) {
    controller.createRecord(req, res);
});

router.put('/', utils.basicAuth(values.write[0], values.write[1]), function(req, res) {
    controller.updateRecord(req, res);
});

router.delete('/id/:id', utils.basicAuth(values.delete[0], values.delete[1]), function(req, res) {
    controller.deleteRecord(req, res);
});

module.exports = router;