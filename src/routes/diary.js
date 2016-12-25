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


//Set routes
router.get('/diary', (req,res)=>{
	db.Itinerary.findAll({
		include: [{
			model: db.Day
		}]
	}).then( post => {
		res.render('diary', {data: post})
		
	})
})

router.post('/dailyThoughts', (req,res)=>{

	var bodyLength = req.body.dayName
	console.log("the titles are : " + bodyLength)

		db.Day.findOne({
			where: {
				header: 'Day' + [i+1]
			}

		})
	
	.then((day)=>{
		console.log("today is gonna be the day: " + day)
		day.createDiary({
			thoughts: req.body.inputName,
			photo: req.body.inputFile
		})

		res.send('succes')
	})
})


module.exports = router