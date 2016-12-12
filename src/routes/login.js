//Import Mdules
const sequelize = require('sequelize')
const express = require ('express')
const app = express()
const pg = require ('pg')
const bodyParser = require ('body-parser')
const session = require('express-session')
const bcrypt = require('bcrypt');
const router = express.Router()

//middleware
router.use(bodyParser.urlencoded({extended:true}))
router.use(session({
	secret: 'random stuff',
	resave: true,
	saveUninitialized: false
}));

//Define database structure
let db = new sequelize('tripapp', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	server:'localhost',
	dialect: 'postgres'
})

//Create tables
let User = db.define('user', {
	name: {type: sequelize.STRING, unique: true},
	email: {type: sequelize.STRING, unique: true},
	password: sequelize.STRING
})

let Itinerary = db.define('itinerary', {
	title: sequelize.STRING,
	days: sequelize.INTEGER,
	resources: sequelize.TEXT
})

let Diary = db.define('diary', {
	thoughts: sequelize.STRING,
	photo: sequelize.STRING
})

let Places = db.define('places', {
	lat: sequelize.FLOAT,
	lng: sequelize.FLOAT
})


//sync database
db.sync({force: true}).then(db => {
	console.log('We synced bruh!')
})

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

	User.findOne({
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

