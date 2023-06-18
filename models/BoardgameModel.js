var mongoose = require('mongoose')

var BoardgameSchema = mongoose.Schema({
    name : String,
    type : String,
    desc : String,
    price : Number,
    image : String,
    years_active : Number,
})

var BoardgameModel = mongoose.model('boardgames', BoardgameSchema, 'boardgames')

module.exports = BoardgameModel