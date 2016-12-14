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
	days: sequelize.INTEGER
})

let Diary = db.define('diary', {
	thoughts: sequelize.STRING,
	photo: sequelize.STRING
})

let Places = db.define('places', {
	lat: sequelize.FLOAT,
	lng: sequelize.FLOAT
})

let Days = db.define('day', {
	day: sequelize.TEXT
})

//Define relations
User.hasMany(Itinerary)
Itinerary.belongsTo(User)

User.hasMany(Places)
Places.belongsTo(User)

Itinerary.hasMany(Days);
Days.belongsTo(Itinerary);

Days.hasMany(Diary);
Diary.belongsTo(Days);


//routes
router.get('/planner', (req,res) => {
	res.render('planner')
})

router.post('/dailyPlan', (req,res) => {
	Itinerary.create({
		title: req.body.name,
		days: req.body.days,
	}).then ((itinerary)=>{
		res.send('success')
	})
})

router.post('/dailyLocation', (req,res) => {
	Places.create({
		lat: req.body.lat,
		lng: req.body.lng
	}).then ((places)=>{
		res.send(' dailyLocation Success!')
	})
})

router.post('/addDays', (req,res) => {
	var bodyLength = req.body.data
	console.log(bodyLength)
	for (var i = bodyLength.length - 1; i >= 0; i--) {
		console.log(bodyLength[i])
	
 	Days.create({
 		day: bodyLength[i]
 	})

 }
		res.send(' dailyLocation Success!')
})

router.post('/deleteLocation', (req,res)=>{
	Places.find({
		where: {
			lat: req.body.lat,
			lng: req.body.lng
		}
	}).then ((beGone)=>{
		beGone.destroy()
	}).then (function(){
		res.send('succesfully Destroyed')
	})
})

module.exports = router