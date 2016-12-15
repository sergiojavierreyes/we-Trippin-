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

})

module.exports = router