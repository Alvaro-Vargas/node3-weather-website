const request = require('request')


const geocode = (address, callback) => {
    
    if (address == undefined) {
        callback('No ADDRESS provided', undefined)
        return;
    }

    //Handling addresses with special characters
    const urlFormattedAddress = encodeURIComponent(address);
    
    const url = `http://api.positionstack.com/v1/forward?access_key=e81f7958e4d10405168afa371af2a318&query=${urlFormattedAddress}&limit=1`    
    
    request({ url, json:true}, (err, res) => {
        if (err) {
            callback('Unable to connect to location services - Low Level Error', undefined);
        } else if (res.body.error) {
            callback('No data could be retrieved from the Geocode API - Body Error', undefined)
        } else if (res.body.data.length == 0) {
            callback('No data could be retrieved from the Geocode API - No Data found', undefined)
        } else {
            const {label, latitude, longitude} = res.body.data[0];
            
            callback(undefined, {
                location: label, 
                longitude,
                latitude
            })
        }
    })
}

module.exports = geocode;