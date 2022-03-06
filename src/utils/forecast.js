const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b355536eb37231f5c921103308cd8d6b&query=${encodeURIComponent(lat)},${encodeURIComponent(long)}&units=f`
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('unable connect', undefined)

        } else if (body.error) {
            callback('no location', undefined)

        } else {
            
            callback(undefined, 
                body.current.weather_descriptions[0] + ' it is ' + body.current.temperature + ', it feels like ' + body.current.feelslike + " the humidity is " + body.current.humidity + "%"

            )

        }

    })    
}

module.exports = forecast