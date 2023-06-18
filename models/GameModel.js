var mongoose = require('mongoose')

var GameSchema = mongoose.Schema({
    name : String,
    category : String,
    desc : String,
    price : Number,
    release_date : Date,
    image : String,
    video : String,
})

var GameModel = mongoose.model("games", GameSchema, "games")

module.exports = GameModel