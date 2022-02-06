var express = require("express");
var router = express.Router(); // get an instance of the express Router
var Campaign = require("../models/campaign.model.js"); // import Brand model from models/brand.model.js
var User = require("../models/user.model.js"); // import User model from models/user.model.js
var middleware = require("../middleware");
var ObjectId = require('mongoose').Types.ObjectId;
const ctrlUser = require('../controllers/user.controller');


// => localhost:3000/brand/
router.get('/', (req, res) => {
    console.log("Campaign");
    Campaign.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Campaign :' + JSON.stringify(err, undefined, 2)); }
    });
});

//sorted influencers list for a campaign
router.get('/influencers-list', (req, res) => {
    console.log("Campaign influencers list");

    if (!req.query.reach_min) {
        req.query.reach_min = 0;
    }
    if (!req.query.reach_max) {
        req.query.reach_max = 2147483647;
    }
    if (!req.query.price_min) {
        req.query.price_min = 0;
    }
    if (!req.query.price_max) {
        req.query.price_max = 2147483647;
    }
    if (!req.query.social_media) {
        User.find({ price_per_post: { $gte: req.query.price_min, $lte: req.query.price_max }, reach: { $gte: req.query.reach_min, $lte: req.query.reach_max }, signUpAs: "Influencer" }, (err, docs) => {
            if (!err) {
                //console.log(docs);
                res.status(200).json({ status: true, influencers: docs });
                //res.send(JSON.stringify(docs));
            }
            else { console.log('Error in Retriving User data :' + JSON.stringify(err, undefined, 2)); }
        }).sort({ price_per_post: 1, reach: 1 });
    }
    else {
        User.find({ price_per_post: { $gte: req.query.price_min, $lte: req.query.price_max }, reach: { $gte: req.query.reach_min, $lte: req.query.reach_max }, signUpAs: "Influencer", social_media_handles: { $elemMatch: { socialMedia: req.query.social_media } } }, (err, docs) => {
            if (!err) {
                //console.log(docs);
                res.status(200).json({ status: true, influencers: docs });
                //res.send(JSON.stringify(docs));
            }
            else { console.log('Error in Retriving User data :' + JSON.stringify(err, undefined, 2)); }
        }).sort({ price_per_post: 1, reach: 1 });
    }
    console.log(req.query.social_media);


});

// show the campaign data
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Campaign.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Campaign :' + JSON.stringify(err, undefined, 2)); }
    });
});


// post the campaign
router.post('/:user_id/create-campaign', (req, res) => {
    console.log(ctrlUser.getUserId);
    console.log("req.body: " + JSON.stringify(req.body));
    User.findById(req.params.user_id, (err, user) => {
        if (err) {
            console.log(err);
        }
        else {
            var campaign = new Campaign({
                productCategory: req.body.productCategory,
                campaignSize: req.body.campaignSize,
                socialMedia: req.body.socialMedia,
                description: req.body.description,
                user: user._id,
            });
            campaign.save((err, doc) => {
                if (!err) { console.log("Saved!!") }
                else { console.log('Error in Campaign Save :' + JSON.stringify(err, undefined, 2)); }
            });
            user.campaigns.push(campaign);
            user.save();
            res.send(user);
        }
    });


});

// edit the campaign
router.put('/:user_id/:campaign_id/edit-campaign', (req, res) => {
    if (!ObjectId.isValid(req.params.campaign_id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var campaign = {
        productCategory: req.body.productCategory,
        campaignSize: req.body.campaignSize,
        socialMedia: req.body.socialMedia,
        description: req.body.description,
    };
    Campaign.findByIdAndUpdate(req.params.campaign_id, { $set: campaign }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Campaign Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

// delete the campaign
router.delete('/:user_id/:campaign_id/delete-campaign', (req, res) => {
    if (!ObjectId.isValid(req.params.campaign_id))
        return res.status(400).send(`No record with given id : ${req.params.campaign_id}`);

    Campaign.findByIdAndRemove(req.params.campaign_id, (err, campaign) => {
        if (!err) {
            console.log("removed campaign!!");
        }
        else { console.log('Error in Campaign Delete :' + JSON.stringify(err, undefined, 2)); }
    });

    User.findByIdAndUpdate(req.params.user_id, { $pull: { campaigns: req.params.campaign_id } }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Campaign Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});




module.exports = router;

