var express  = require('express');
const GameModel = require('../models/GameModel');
var router = express.Router()

router.get('/', async(req, res)=>{
    var games = await GameModel.find({})
    res.render('game/index', {games : games})
})

router.get('/detail/:id', async(req, res)=>{
    var game = await GameModel.findById(req.params.id)
    res.render('game/detail', {game : game})
})

router.get('/delete/:id', async(req, res)=>{
    await GameModel.findByIdAndDelete(req.params.id)
    .then(()=>{console.log('Delete game succeed')})
    res.redirect('/game')
})

router.get('/edit/:id', async(req,res)=>{
    var game = await GameModel.findById(req.params.id)
    res.render('game/edit', {game : game})
})

router.post('/edit/:id', async(req, res)=>{
    var game = await GameModel.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/game')
})

router.get('/add', async(req,res)=>{
    res.render('game/add')
})

router.post('/add', async(req,res)=>{
    var game = req.body
    await GameModel.create(game)
    res.redirect('/game')
})

router.post('/search', async (req, res) => {
    var keyword = req.body.name;
    var games = await GameModel.find({ name: new RegExp(keyword, "i")})
    res.render('game/index', { games: games})
 })

module.exports = router;