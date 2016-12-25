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

router.get('/profile', function (req, res) {
	var user = req.session.user
	db.Itinerary.findAll({
		where: {
			id: req.session.user.id
		},
		include: [{
			model: db.Day
		}]
	}).then ((post)=>{
		res.render('profile', {
			user: user,
			everything: post
		})
	})
})

module.exports = router
