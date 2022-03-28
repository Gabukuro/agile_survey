const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    role: {
        type: String,
        enum: ['leader', 'member'],
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;