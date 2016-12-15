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
router.get('/planner', (req,res) => {
	var user = req.session.user
	res.render('planner')
})

router.post('/dailyPlan', (req,res) => {
	console.log("session user is: " + req.session.user.id)
	db.User.findOne({
		where: {
			id: req.session.user.id
		}
	}).then( (user) =>{
		user.createItinerary({
			title: req.body.dataName
		}).then ((itinerary)=>{
			res.redirect('profile')
		})
	})
})

router.post('/dailyLocation', (req,res) => {
	console.log("session user is: " + req.session.user.id)
	db.User.findOne({
		where: {
			id: req.session.user.id
		}
	}).then( (user) =>{
		user.createPlace({
			lat: req.body.lat,
			lng: req.body.lng
		}).then ((place)=>{
			res.send(' dailyLocation Success!')
		})
	})
})

router.post('/addDays', (req,res) => {
	db.Itinerary.findOne({
		where: {
			title: req.body.dataName
		}
	}).then ((itinerary)=>{

		console.log(itinerary)

		var bodyLength = req.body.data
		console.log(bodyLength)

		for (var i = bodyLength.length - 1; i >= 0; i--) {

			itinerary.createDay({
				day: bodyLength[i]
			})
		}
		res.redirect('profile')
	})
})

router.post('/deleteLocation', (req,res)=>{
	db.Place.find({
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