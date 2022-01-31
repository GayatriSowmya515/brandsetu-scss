const mongoose = require('mongoose');

var campaignSchema = new mongoose.Schema({
    productCategory: {
        type: String,
        required: 'Can\'t be empty',
    },
    campaignSize: {
        type: String,
        required: 'Can\'t be empty'
    },
    socialMedia: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: 'Can\'t be empty'
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});

module.exports = mongoose.model('Campaign', campaignSchema); 
