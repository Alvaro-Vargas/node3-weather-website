const request = require('request')

const forecast = (lat, lon, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=2a5bb771ad4c7e142569eedd2c31103c&query=${lat},${lon}`;

    request({url, json:true}, (err, res) => {
        if (err) {
            callback('Can\'t connect to Weather ("Forecast") API... :( (low level OS error)', undefined)
        } else if (res.body.error) {
            callback('Weather API error')
        } else {
            const weatherDescription = res.body.current.weather_descriptions[0];
            const {temperature,feelslike} = res.body.current;

            
            callback(undefined, {
                weatherDescription, 
                temperature, 
                feelslike
            } )
        }

    })

}


module.exports = forecast;