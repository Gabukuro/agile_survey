const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    answer: Number,
    justify: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    }
});

const answerModel = mongoose.model('Answer', answerSchema);

module.exports = answerModel;