const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric_creature.json');
    let creatureData = JSON.parse(creatures)
    // console.log(creatureData)
    let typeFilter = req.query.typeFilter;

    if (typeFilter) {
        creatureData = creatureData.filter(creature => creature.type.toLowerCase() === typeFilter.toLowerCase())
    }

    res.render('creatures/index', {myCreatures: creatureData})
})

router.get('/new', (req, res) => {
    res.render('creatures/new')
})

router.get('/:idx', (req, res) => {
    // get creatures
    let creatures = fs.readFileSync('./prehistoric_creature.json')
    let creatureData = JSON.parse(creatures)

    // get array index from url parameter
    let creatureIndex = parseInt(req.params.idx)

    // render page with data of specified creature
    res.render('creatures/show', {myCreature: creatureData[creatureIndex]})
})

router.post('/', (req, res) => {
    // read creature file
    let creatures = fs.readFileSync('./prehistoric_creature.json')
    let creatureData = JSON.parse(creatures)
    
    // add item to creatures array
    creatureData.push(req.body)

    // save creatures to the data.json file
    fs.writeFileSync('./prehistoric_creatures.js', JSON.stringify(creatureData))

    // redirect to the GET /creatures route (index)
    res.redirect('/prehistoric_creatures')
})


module.exports = router