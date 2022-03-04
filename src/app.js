const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)

console.log(path.join(__dirname, '..', 'public'))

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '..', 'public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPaths = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') 
app.set('views', viewsPath)
console.log(partialsPaths)
hbs.registerPartials(partialsPaths)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vale'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Vale'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help App 2',
        name: 'Vale',
        title: 'Help'
    })
})


app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: 'And address should be provided'
        })        
    }
    var address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }    
        forecast(latitude, longitude, (error, {temperature, feelsLike, description}) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                temperature,
                feelsLike,
                description
            })                    
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'vale',
        errorMessage: 'article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vale',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})