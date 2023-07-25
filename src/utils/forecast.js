const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    
    const url='http://api.weatherstack.com/current?access_key=065e77304a5ca9eca0ec2e08b3d81b9f&query='+latitude+','+longitude

    request({url,json:true},(error,{body})=>{

        if (error){
            callback('Unable to connect  weather api',undefined)
        }
        else if (body.error) {
            callback(body.error.info,undefined)
        }
        else {
            body.current
            callback(undefined,'temperature is '+body.current.temperature+' degree celcius humidity is '+body.current.humidity+'% .Weather Description: '+body.current.weather_descriptions[0])

        

        }
    })
}
module.exports = forecast