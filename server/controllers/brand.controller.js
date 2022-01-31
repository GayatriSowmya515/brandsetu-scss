var express = require("express");
var router = express.Router(); // get an instance of the express Router
var Campaign = require("../models/campaign.model.js"); // import Brand model from models/brand.model.js
var User = require("../models/user.model.js"); // import User model from models/user.model.js
var middleware = require("../middleware");
var ObjectId = require('mongoose').Types.ObjectId;


// => localhost:3000/brand/
router.get('/', (req, res) => {
    console.log(Campaign);
    Campaign.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Campaign :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Campaign.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Campaign :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.post('/:user_id/create-campaign', (req, res) => {
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
