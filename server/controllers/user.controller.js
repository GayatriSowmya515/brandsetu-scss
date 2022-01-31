const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

module.exports.register = (req, res, next) => { // register new user
    var user = new User();
    user.phone = req.body.phone;
    user.email = req.body.email;
    user.password = req.body.password;
    user.signUpAs = req.body.signUpAs;
    user.category = req.body.category;
    user.social_media_handles = req.body.social_media_handles;
    // console.log(req.body.social_media_handles);
    // console.log(user.social_media_handles[0].profile_url);
    // console.log(user.social_media_handles[0].user_id);
    // console.log(user.social_media_handles[0].socialMedia);
    // console.log(user.social_media_handles[0].followers);
    // user.user_id = req.body.user_id;
    // user.profile_url = req.body.profile_url;
    // user.followers = req.body.followers;
    // user.socialMedia = req.body.socialMedia;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    console.log(req.body);
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) {
            console.log("failed :(");
            return res.status(400).json(err);
        }
        // registered user
        else if (user) {
            console.log("Success");
            return res.status(200).json({ "token": user.generateJwt() });
        }// unknown user or wrong password
        else {
            console.log("wrong credentials ");
            return res.status(404).json(info);
        }
    })(req, res);
}

module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id }, // find user by id
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['user_id', 'email', 'socialMedia', 'profile_url']) });
        }
    );
}