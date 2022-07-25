const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {  
    res.render('index', {
        title: 'Weather Application',
        name: 'Sidor'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'A little about my childhood.',
        name: 'Sidor'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Sidor'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You forgot to enter the addres or its value Ты забыл ввести адрес или его значение'
        })
    }
    // console.log(req.query)

geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
        return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            forecast: forecastData,
            location,
        //    address: req.query.address
        })

    })

})
})

app.get('/products', (req, res) => {
    if(!req.query.setting) {
        return res.send({
            error: 'You have to provide anything'
        })
    }
    
    console.log(req.query.setting)
    res.send({
        prouct: []
    })
    })




app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sidor',
        errorMessage: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sidor',
        errorMessage: 'Page not found'
    })
})





app.listen(3000, () => {
    console.log('Сервер запущен. Порт 3000. The server is up on a port 3000.')
})
