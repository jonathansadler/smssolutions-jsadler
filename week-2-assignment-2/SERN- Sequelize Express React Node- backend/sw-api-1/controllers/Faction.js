const db = require('../models/index').sequelize;
const Op = require('../models/index').Sequelize.Op;
const utils = require('./utils');
const logger = require('../utils').logger;
const Faction = require ('../models').Faction;

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
                logger.error('Searching on Faction with incorrect field: ' + options.field);
                return res.status(400).send({ error: true, message: 'The requested search field is not configured.' });
                break;
            }
        }
    },

    async paginatedList(res, options){
        try {
            var results = await Faction.findAndCountAll({
                offset: options.offset,
                limit: options.limit,
            });
            return res.status(200).send({ error: false, total: results.count, records: results.rows });
        } catch (error) {
            logger.error('Paginated search on Faction with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your search could not be completed.' });
        }
    },

    async paginatedLike(res, options) {
        try {
            var results = await Faction.findAndCountAll({
                where: {
                    [ options.field ]: { [Op.like]: '%' + options.value + '%' }
                },
                offset: options.offset,
                limit: options.limit,
            });
            return res.status(200).send({
                error: false,
                total: results.count,
                records: results.rows
            });
        } catch (error) {
            logger.error('Paginated like search on Faction with error: ' + error);
            return res.status(500).send({
                error: true,
                message: 'Your search could not be completed.'
            });
        }
    },
    
    async createRecord(req, res) {
        try {
            const result = await Faction.create({
                galatic_empire: req.body.galatic_empire,
                jedi_order: req.body.jedi_order,
                no_faction: req.body.no_faction,
                rebel_alliance: req.body.rebel_alliance,
            });
            res.status(201).send({ error: false, result: result });
        } catch (error) {
            logger.error('Create on Faction with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be created.' });
        }
    },

    async updateRecord(req, res) {
        try {
            const result = await Faction.update(
                {
                    galatic_empire: req.body.galatic_empire,
                    jedi_order: req.body.jedi_order,
                    no_faction: req.body.no_faction,
                    rebel_alliance: req.body.rebel_alliance,
                },
                {
                    where: { id: req.body.id }
                }
            );
            res.status(201).send({ error: false, result: result });
        } catch (error) {
            logger.error('Update on Faction with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be updated.' });
        }
    },

    async readRecord(req, res) {
        try {
            const result = await Faction.findOne({
                where: { id: req.params.id },
            });
            if(result){
                res.status(200).send(result);
            }
            else {
                res.status(404).send({ error: true, message: 'Record not found' });
            }
        } catch (error) {
            logger.error('Read on Faction with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be read.' });
        }
    },

    async listAll(req, res) {
        try {
            var results = await Faction.findAll({
            });
            return res.status(200).send(results);
        } catch (error) {
            logger.error('List on Faction with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your search could not be completed.' });
        }
    },

    async deleteRecord(req, res) {
        try {
            const result = await Faction.destroy({
                where: { id: req.params.id },
            });
            res.status(201).send({ result });
        } catch (error) {
            logger.error('Delete on Faction with error: ' + error);
            return res.status(500).send({ error: true, message: 'Your record could not be deleted.' });
        }
    },
};