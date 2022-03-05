const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=d0281a1c7c1ce4b4d30b6bc81c8a8074&query=' + latitude + ',' + longitude + '&units=f'
    console.log(url)
    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if(body.error){
            callback('Unable to find coordinates. Try another search.')
        } else {            
            callback(undefined, {                
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike,
                description: body.current.weather_descriptions[0],
                data: body.current                
            })
        }
    })

}

module.exports = forecast