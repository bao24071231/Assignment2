var express = require('express')
const BoardgameModel = require('../models/BoardgameModel')
var router = express.Router()

router.get('/', async(req, res)=>{
    var boardgames = await BoardgameModel.find({})
    res.render('boardgame/index', {boardgames : boardgames})
})

router.get('/detail/:id', async(req, res)=>{
    var boardgame = await BoardgameModel.findById(req.params.id)
    res.render('boardgame/detail', {boardgame : boardgame})
})

router.get('/delete/:id', async(req, res)=>{
    await BoardgameModel.findByIdAndDelete(req.params.id)
    .then(()=>{console.log('Delete boardgame succeed')})
    res.redirect('/boardgame')
})

router.get('/edit/:id', async(req,res)=>{
    var boardgame = await BoardgameModel.findById(req.params.id)
    res.render('boardgame/edit', {boardgame : boardgame})
})

router.post('/edit/:id', async(req, res)=>{
    var boardgame = await BoardgameModel.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/boardgame')
})

router.get('/add', async(req,res)=>{
    res.render('boardgame/add')
})

router.post('/add', async(req,res)=>{
    var boardgame = req.body
    await BoardgameModel.create(boardgame)
    res.redirect('/boardgame')
})

router.post('/search', async (req, res) => {
    var keyword = req.body.name;
    var boardgames = await BoardgameModel.find({ name: new RegExp(keyword, "i")})
    res.render('boardgame/index', { boardgames: boardgames})
 })

module.exports = router