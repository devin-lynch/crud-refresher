const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs)
    // console.log(dinoData)
    let nameFilter = req.query.nameFilter;

    if (nameFilter) {
        dinoData = dinoData.filter(dino => dino.name.toLowerCase() === nameFilter.toLowerCase())
    }

    res.render('dinosaurs/index', {myDinos: dinoData})
})


router.get('/new', (req, res) => {
    res.render('dinosaurs/new')
})


// express show route for dinosaurs (lists a single dino)
router.get('/:idx', (req, res) => {
    // get dinosaurs
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // get array index from url parameter
    let dinoIndex = parseInt(req.params.idx);

    // render page with data of the specified animal
    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]})
})

router.post('/', (req, res) => {
    // read dinosaurs file
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // add item to dinosaurs array
    dinoData.push(req.body)

    // save dinosaurs to the data.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs')
})


module.exports = router
