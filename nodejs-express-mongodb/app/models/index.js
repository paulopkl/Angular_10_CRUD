const dbConfig = require('../config/db.config');
const mongoose = require('mongoose');
const Tutorials = require('./tutorial.model');

const db = {
    mongoose,
    url: dbConfig.url,
    tutorials: Tutorials,
};

module.exports = db;