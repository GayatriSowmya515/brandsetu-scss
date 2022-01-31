const mongoose = require('mongoose');

var socialMediaHandleSchema = new mongoose.Schema({
    socialMedia: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: 'User Id can\'t be empty'
    },
    profile_url: {
        type: String,
        required: 'Profile URL can\'t be empty'
    },
    followers: {
        type: Number,
        required: 'Followers can\'t be empty'
    },
});

// Custom validation for profile url
socialMediaHandleSchema.path('profile_url').validate((val) => {
    profileRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return profileRegex.test(val);
}, 'Invalid profile URL.');


module.exports = mongoose.model('SocialMediaHandle', socialMediaHandleSchema); 