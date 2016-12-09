//Import Mdules
const sequelize = require('sequelize')
const express = require ('express')
const app = express()
const pg = require ('pg')
const bodyParser = require ('body-parser')
const session = require('express-session')
var bcrypt = require('bcrypt');

app.set('view engine', 'pug')
app.set('views', __dirname + "/views")

app.use('/resources',express.static(__dirname + '/static'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
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
	lat: sequelize.STRING,
	long: sequelize.STRING
})

app.get('/', function (request, response) {
	response.render('index', {
		message: request.query.message,
		user: request.session.user
	})
});

app.get('/profile', function (request, response) {
	var user = request.session.user;
	if (user === undefined) {
		response.redirect('/?message=' + encodeURIComponent("Please log in to view your profile."));
	} else {
		response.render('profile', {
			user: user
		})
	}
})

app.post('/login', bodyParser.urlencoded({extended: true}), function (request, response) {
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

app.get('/logout', function (request, response) {
	request.session.destroy(function(error) {
		if(error) {
			throw error;
		}
		response.redirect('/?message=' + encodeURIComponent("Successfully logged out."));
	})
});

app.get('/register', (req,res) => {
	res.render('register')
})

app.post('/register', (req,res) => {

	bcrypt.hash(req.body.password, 5, function(err,hash){
		console.log(hash)

		User.create({
			name: req.body.name,
			email: req.body.email,
			password: hash
		})
		res.redirect('/')
	})
})

app.get('/planner', (req,res) => {
	res.render('planner')
})

app.post('/dailyPlan', (req,res) => {
	Itinerary.create({
		title: req.body.name,
		days: req.body.days,
		resources: req.body.resources
	}).then ((itinerary)=>{
		res.redirect('planner')
	})
})



db.sync({force: true}).then(db => {
	console.log('We synced bruh!')
})

app.listen(1337,()=>{
	console.log("1337 IAM ALL THE WAY UP!")
})