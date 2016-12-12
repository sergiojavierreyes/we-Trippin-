//Import Mdules
const sequelize = require('sequelize')
const express = require ('express')
const app = express()
const pg = require ('pg')
const bodyParser = require ('body-parser')
const session = require('express-session')
var bcrypt = require('bcrypt');

//set views
app.set('view engine', 'pug')
app.set('views', __dirname + "/views")


//set static folders
app.use('/resources',express.static(__dirname + '/static'))

//Set routes
let loginlogoutrouter = require (__dirname + '/routes/login')
let registerrouter = require (__dirname + '/routes/register')
let profilerouter = require (__dirname + '/routes/profile')
let plannerrouter = require (__dirname + '/routes/planner')

app.use('/', loginlogoutrouter)
app.use('/', registerrouter)
app.use('/', profilerouter)
app.use('/', plannerrouter)

app.listen(1337,()=>{
	console.log("1337 IAM ALL THE WAY UP!")
})