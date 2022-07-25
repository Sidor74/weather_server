const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/forecast?access_key=74f43d99f49c59ec209a399b6f9d3a0c&query='+ latitude + ',' + longitude + '&units=m'
    request({url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('Нет подключения  Unable to connect to ',undefined)
        }else if (body.error) {
            callback(body.error.info, undefined)
        }else {
            callback(undefined, body.current.weather_descriptions[0] + '. Текущая температура в городе ' + body.location.name + ' = ' + body.current.temperature + ', а по ощущению = ' + body.current.feelslike)
        }
    })
}

module.exports = forecast

// forecast(51.2, 58.61667, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
// })