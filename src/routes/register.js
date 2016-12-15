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
router.get('/register', (req,res) => {
	res.render('register', {
		message: req.query.message
	})
})

router.post('/register', (req,res) => {
	let password = req.body.password

	if(req.body.name === 0) {
		res.redirect('/register?message=' + encodeURIComponent("Please fill out your name."));
		return;
	}

	if(req.body.email.length === 0) {
		res.redirect('/register?message=' + encodeURIComponent("Please fill out your email address."));
		return;
	}

	if(req.body.password.length < 8) {
		res.redirect('/register?message=' + encodeURIComponent("Password has to be at least 8 char long."));
		return;
	}
	if(req.body.password.length === 0) {
		res.redirect('/register?message=' + encodeURIComponent("Please fill out your password."));
		return;
	}

	bcrypt.hash(req.body.password, 5, function(err,hash){
		console.log(hash)

		db.User.create({
			name: req.body.name,
			email: req.body.email,
			password: hash
		})
		res.redirect('/')
	})
})

module.exports = router
