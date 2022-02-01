const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// validation for profile url
var profile_validation = function (val) {
    profileRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return profileRegex.test(val);
}


var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    phone: {
        type: String,
        required: 'Phone number can\'t be empty'
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [4, 'Password must be atleast 4 character long']
    },
    signUpAs: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: 'Select atleast one category'
    },

    social_media_handles: [{
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "SocialMediaHandle"
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
            required: 'Profile URL can\'t be empty',
            validate: [profile_validation, 'Invalid profile URL.']
        },
        followers: {
            type: Number,
            required: 'Followers can\'t be empty'
        },
    }],

    campaigns: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign"
    }],

    price_per_post: {
        type: Number,
    },
    reach: {
        type: Number,
    },
    saltSecret: String
});


// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Custom validation for phone
userSchema.path('phone').validate((val) => {
    phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(val);
}, 'Invalid phone number.');


// Events 
userSchema.pre('save', function (next) { // Hash password before saving to database
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});


// Methods
userSchema.methods.verifyPassword = function (password) { // Check if password is correct
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () { // Generate Token
    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP // Token expires in 1 hour
        });
}



module.exports = mongoose.model('User', userSchema); 