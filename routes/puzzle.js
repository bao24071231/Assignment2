var express = require('express')
const PuzzleModel = require('../models/PuzzleModel')
var router = express.Router()

router.get('/', async(req, res)=>{
    var puzzles = await PuzzleModel.find({})
    res.render('puzzle/index', {puzzles : puzzles})
})

router.get('/detail/:id', async(req, res)=>{
    var puzzle = await PuzzleModel.findById(req.params.id)
    res.render('puzzle/detail', {puzzle : puzzle})
})

router.get('/delete/:id', async(req, res)=>{
    await PuzzleModel.findByIdAndDelete(req.params.id)
    .then(()=>{console.log('Delete puzzle succeed')})
    res.redirect('/puzzle')
})

router.get('/edit/:id', async(req,res)=>{
    var puzzle = await PuzzleModel.findById(req.params.id)
    res.render('puzzle/edit', {puzzle : puzzle})
})

router.post('/edit/:id', async(req, res)=>{
    var puzzle = await PuzzleModel.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/puzzle')
})

router.get('/add', async(req,res)=>{
    res.render('puzzle/add')
})

router.post('/add', async(req,res)=>{
    var puzzle = req.body
    await PuzzleModel.create(puzzle)
    res.redirect('/puzzle')
})

router.post('/search', async (req, res) => {
    var keyword = req.body.name;
    var puzzles = await PuzzleModel.find({ name: new RegExp(keyword, "i")})
    res.render('puzzle/index', { puzzles: puzzles})
 })

module.exports = router
