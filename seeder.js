const Food = require('./models/foodModel')
const Activity = require('./models/activityModel')
const mongoose = require('mongoose')
const activities = require('./data/activities')
const foods = require('./data/foods')

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
	.connect(db)
	.then( () => console.log('MongoDB Connected'))
    .catch(err => console.log(err)); 

const loadData = async () =>{
    await Food.insertMany(foods)
    await Activity.insertMany(activities)
}
loadData()