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

//Set routes
router.get('/diary', (req,res)=>{
		Days.findOne({
		where: {
			day: request.body.email
		}
	})
	res.render('diary')
})



module.exports = router