const db = require('../models/index').sequelize;
const Op = require('../models/index').Sequelize.Op;
const utils = require('./utils');
const logger = require('../utils').logger;
const Card = require ('../models').Card;
const Deck = require ('../models').Deck;

const swapi = require('swapi-node');

module.exports = {
    /**
     * Routes different types of search for the model
     * @param {*} req 
     * @param {*} res 
     */
    async searchRecords(req, res){
        var options = utils.getSearchOptions(req);
        switch(options.field){
            case 'any': {
                this.paginatedList(res, options);
                break;
            }
            default:{
                logger.error('Searching on Card with incorrect field: ' + options.field);
                return res.status(400).send({ error: true, message: 'The requested search field is not configured.' });
                break;
            }
        }
    },

    async paginatedList(res, options){
        try {
            var results = await Card.findAndCountAll({
                offset: options.offset,
                limit: options.limit,
                include: [
                    { model: Deck },
                ],
            });
            return res.status(200).send({ error: false, total: results.count, records: results.rows });
        } catch (error) {
            logger.error('Paginated search on Card with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your search could not be completed.' });
        }
    },

    async paginatedLike(res, options) {
        try {
            var results = await Card.findAndCountAll({
                where: {
                    [ options.field ]: { [Op.like]: '%' + options.value + '%' }
                },
                offset: options.offset,
                limit: options.limit,
                include: [
                    { model: Deck },
                ],
            });
            return res.status(200).send({
                error: false,
                total: results.count,
                records: results.rows
            });
        } catch (error) {
            logger.error('Paginated like search on Card with error: ' + error);
            return res.status(500).send({
                error: true,
                message: 'Your search could not be completed.'
            });
        }
    },
    
    async createRecord(req, res) {
        try {
            const result = await Card.create({
                swid: req.body.swid,
                person_url: req.body.person_url,
                DeckId: req.body.DeckId,
            });
            res.status(201).send({ error: false, result: result });
        } catch (error) {
            logger.error('Create on Card with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be created.' });
        }
    },

    async updateRecord(req, res) {
        try {
            const result = await Card.update(
                {
                    swid: req.body.swid,
                    person_url: req.body.person_url,
                    DeckId: req.body.DeckId,
                },
                {
                    where: { id: req.body.id }
                }
            );
            res.status(201).send({ error: false, result: result });
        } catch (error) {
            logger.error('Update on Card with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be updated.' });
        }
    },

    async readRecord(req, res) {
        try {
            const result = await Card.findOne({
                where: { id: req.params.id },
                include: [
                    { model: Deck },
                ],
            });
            
            var resultsa = await swapi.people({ id:req.params.id });
            
            var resultsb = {};
            resultsb.name = resultsa.name;
            resultsb.gender = resultsa.gender;
            resultsb.birth_year = resultsa.birth_year;
            
            var parseHomeworld = resultsa.homeworld;
            var parseHomeworldNameArray = [];
            parseHomeworldNameArray[0] = await swapi.get(parseHomeworld);
            //console.log(parseHomeworldNameArray[0].name);

            var parseVehicles = resultsa.vehicles;
            var parseVehiclesNameArray = [];
            for (var i = 0; i < parseVehicles.length; i++) {
                parseVehiclesNameArray[i] = await swapi.get(parseVehicles[i]);
            }
            //console.log(parseVehiclesNameArray[0].name);

            var vehiclesArrayName = [];

            for (var i = 0; i < parseVehiclesNameArray.length; i++) {
                vehiclesArrayName[i] = parseVehiclesNameArray[i].name;
            }
            

            var parseStarships = resultsa.starships;
            var parseStarshipsNameArray = [];
            for (var i = 0; i < parseStarships.length; i++) {
                parseStarshipsNameArray[i] = await swapi.get(parseStarships[i]);
            }
            //console.log(parseStarshipsNameArray[0].name);

            var starshipsArrayName = [];

            for (var i = 0; i < parseStarshipsNameArray.length; i++) {
                starshipsArrayName[i] = parseStarshipsNameArray[i].name;
            }

            var parseSpecies = resultsa.species;
            var parseSpeciesNameArray = [];
            parseSpeciesNameArray[0] = await swapi.get(parseSpecies);
            //console.log(parseSpeciesNameArray[0].name);


            
            var FinalResultObj = {"identifiers": result,
                "maindata": resultsb,
                "homeworlds": [],
                "vechiles": [],
                "starships": [],
                "species": []
            };

            FinalResultObj.homeworlds.push(parseHomeworldNameArray[0].name);
            FinalResultObj.vechiles.push(vehiclesArrayName);
            FinalResultObj.starships.push(starshipsArrayName);
            FinalResultObj.species.push(parseSpeciesNameArray[0].name);

            //console.log(FinalResultObj);
            console.log("end");

            if(FinalResultObj){
                res.status(200).send(FinalResultObj);
            }
            else {
                res.status(404).send({ error: true, message: 'Record not found' });
            }
        } catch (error) {
            logger.error('Read on Card with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be read.' });
        }
    },

    async listAll(req, res) {
        try {
            var results = await Card.findAll({
                include: [
                    { model: Deck },
                ],
            });
            return res.status(200).send(results);
        } catch (error) {
            logger.error('List on Card with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your search could not be completed.' });
        }
    },

    async deleteRecord(req, res) {
        try {
            const result = await Card.destroy({
                where: { id: req.params.id },
            });
            res.status(201).send({ result });
        } catch (error) {
            logger.error('Delete on Card with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be deleted.' });
        }
    },
};