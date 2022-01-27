const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: String,
    code: String,
});

const teamModel = mongoose.model('Team', teamSchema);

module.exports = teamModel;