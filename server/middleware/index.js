var Campaign = require("../models/campaign.model");
var User = require("../models/user.model");
const flash = require("connect-flash");
//all the middle goes here
var middlewareObj = {};

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/authenticate");
}

module.exports = middlewareObj;