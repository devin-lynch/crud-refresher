// required packages
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')


// express app config
const PORT = 3002
app.set('view engine', 'ejs')
app.use(ejsLayouts)
// tell express to listen for request bodies sent from HTML forms
app.use(express.urlencoded({ extended: false }))

// middleware
// app.use('/dinosaurs', require('./controllers/dinosaurs'))
// app.use('/prehistoric', require('./controllers/prehistoric_creatures'))


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/dinosaurs', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs)
    console.log(dinoData)
    res.render('dinosaurs/index', {myDinos: dinoData})
})


app.get('/dinosaurs/new', (req, res) => {
    res.render('dinosaurs/new')
})


// express show route for dinosaurs (lists a single dino)
app.get('/dinosaurs/:idx', (req, res) => {
    // get dinosaurs
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // get array index from url parameter
    let dinoIndex = parseInt(req.params.idx);

    // render page with data of the specified animal
    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]})
})



// listen on port
app.listen(PORT, () => console.log(`Dinos on port ${PORT}`))