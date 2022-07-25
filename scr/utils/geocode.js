const request = require('request')

const geocode = (city, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + city + '.json?access_token=pk.eyJ1Ijoic2lkb3I3Nzc0IiwiYSI6ImNsNGZlZ2xhMzAybHozb3FyOHoxNHY5cXcifQ.llqMO3UtEw79l_oqVr9hCA'
    request({url, json: true}, (error, {body} = {}) => {
        // console.log(error)
        // console.log('length = ', body.features.length)
    if(error) {
        callback('Невозможно подключиться к службе!  Unable to connect to MAPBOX.COM!', undefined)
    }else if (body.features.length < 1) {
        callback('Невозможно определить местоположение! Unable to find location!', undefined)
    }else {
        callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
    // callback('Широта центра города ' + response.body.features[0].text + ' имеет значение = ' + latitude + ', а долгота = ' + longitude)
        })
    }
    })
}  

module.exports = geocode

// geocode('padna',(error,data) => {
//     console.log('error', error)
//     console.log('Data', data)   
// })
