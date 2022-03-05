const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ2lzZWxsZXp6cSIsImEiOiJjbDA1cm8zdHMyMHEyM2Jwa2JsMG5mcWt6In0.zIBEPYQj-EN2YNCOv1aYXQ&limit=1`

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('unable connect', undefined)

        } else if (body.features.length === 0) {
            callback('no location', undefined)

        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0], 
                location: body.features[0].place_name

            })

        }

    })    
}

module.exports = geocode