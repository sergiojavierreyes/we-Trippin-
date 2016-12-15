//Import Mdules
const sequelize = require('sequelize')
const express = require ('express')
const app = express()
const pg = require ('pg')
const bodyParser = require ('body-parser')
const session = require('express-session')
const bcrypt = require('bcrypt');
const router = express.Router()

var db = require('../model/database');


router.use(bodyParser.urlencoded({extended:true}))
router.use(session({
	secret: 'random stuff',
	resave: true,
	saveUninitialized: false
}));

router.get('/profile', function (request, response) {
	var user = request.session.user;
	if (user === undefined) {
		response.redirect('/?message=' + encodeURIComponent("Please log in to view your profile."));
	} else {
		response.render('profile', {
			user: user
		})
	}
})

module.exports = router
