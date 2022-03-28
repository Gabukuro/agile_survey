const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: String,
    code: String,
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

const teamModel = mongoose.model('Team', teamSchema);

module.exports = teamModel;