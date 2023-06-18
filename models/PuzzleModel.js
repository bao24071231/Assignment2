var mongoose = require('mongoose')

var PuzzleSchema = mongoose.Schema({
    name : String,
    type : String,
    desc : String,
    price : Number,
    originated_year : Number,
    image : String,
})

var PuzzleModel = mongoose.model('puzzles', PuzzleSchema, 'puzzles')
module.exports = PuzzleModel