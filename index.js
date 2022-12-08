// required packages
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')


// express app config
const PORT = 3002
app.set('view engine', 'ejs')
app.use(ejsLayouts)
// body parser middleware -- tell express to listen for request bodies sent from HTML forms
app.use(express.urlencoded({ extended: false }))

//middleware
app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))



app.get('/', (req, res) => {
    res.render('home')
})

// app.get('/dinosaurs', (req, res) => {
//     let dinosaurs = fs.readFileSync('./dinosaurs.json');
//     let dinoData = JSON.parse(dinosaurs)
//     // console.log(dinoData)
//     let nameFilter = req.query.nameFilter;

//     if (nameFilter) {
//         dinoData = dinoData.filter(dino => dino.name.toLowerCase() === nameFilter.toLowerCase())
//     }

//     res.render('dinosaurs/index', {myDinos: dinoData})
// })


// app.get('/dinosaurs/new', (req, res) => {
//     res.render('dinosaurs/new')
// })


// // express show route for dinosaurs (lists a single dino)
// app.get('/dinosaurs/:idx', (req, res) => {
//     // get dinosaurs
//     let dinosaurs = fs.readFileSync('./dinosaurs.json')
//     let dinoData = JSON.parse(dinosaurs)

//     // get array index from url parameter
//     let dinoIndex = parseInt(req.params.idx);

//     // render page with data of the specified animal
//     res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]})
// })

// app.post('/dinosaurs', (req, res) => {
//     // read dinosaurs file
//     let dinosaurs = fs.readFileSync('./dinosaurs.json')
//     let dinoData = JSON.parse(dinosaurs)

//     // add item to dinosaurs array
//     dinoData.push(req.body)

//     // save dinosaurs to the data.json file
//     fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

//     // redirect to the GET /dinosaurs route (index)
//     res.redirect('/dinosaurs')
// })


// listen on port
app.listen(PORT, () => console.log(`Dinos on port ${PORT}`))