var sequelize = require( 'sequelize' )

var db = {
	mod: {}
}


//Define database structure
let DataBase = new sequelize('tripapp', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	server:'localhost',
	dialect: 'postgres'
})

//Models

//Create tables
db.User = DataBase.define('user', {
	name: {type: sequelize.STRING, unique: true},
	email: {type: sequelize.STRING, unique: true},
	password: sequelize.STRING
})

db.Itinerary = DataBase.define('itinerary', {
	title: sequelize.STRING
})

db.Diary = DataBase.define('diary', {
	thoughts: sequelize.STRING,
	photo: sequelize.STRING
})

db.Place = DataBase.define('place', {
	lat: sequelize.FLOAT,
	lng: sequelize.FLOAT
})

db.Day = DataBase.define('day', {
	header: sequelize.TEXT,
	day: sequelize.TEXT
})

//Set Relations
db.User.hasMany(db.Itinerary)
db.Itinerary.belongsTo(db.User)

db.User.hasMany(db.Place)
db.Place.belongsTo(db.User)

db.Itinerary.hasMany(db.Day);
db.Day.belongsTo(db.Itinerary);

db.Day.hasMany(db.Diary);
db.Diary.belongsTo(db.Day);

DataBase.sync({force: false}).then(db => {
	console.log('We synced bruh!')
})

module.exports = db