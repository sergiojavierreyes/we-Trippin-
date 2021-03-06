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

//middleware
router.use(bodyParser.urlencoded({extended:true}))
router.use(session({
	secret: 'random stuff',
	resave: true,
	saveUninitialized: false
}));


//routes
router.get('/', function (request, response) {
	response.render('index', {
		message: request.query.message,
		user: request.session.user
	})
});

router.post('/login', bodyParser.urlencoded({extended: true}), function (request, response) {
	if(request.body.email.length === 0) {
		response.redirect('/?message=' + encodeURIComponent("Please fill out your email address."));
		return;
	}

	if(request.body.password.length === 0) {
		response.redirect('/?message=' + encodeURIComponent("Please fill out your password."));
		return;
	}

	db.User.findOne({
		where: {
			email: request.body.email
		}
	}).then(function (user) {
		var hash = user.password

		bcrypt.compare(request.body.password, hash, (err, res) => { 
			if (user !== null && res == true) {
				request.session.user = user
				response.redirect('/profile')
				console.log(hash)

			// (user !== null && request.body.password === user.password) {
			// request.session.user = user;
			// response.redirect('/profile');
			

		} else {
			response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
		}
	})
	}, function (error) {
		response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
	});
});

router.get('/logout', function (request, response) {
	request.session.destroy(function(error) {
		if(error) {
			throw error;
		}
		response.redirect('/?message=' + encodeURIComponent("Successfully logged out."));
	})
});


module.exports = router

