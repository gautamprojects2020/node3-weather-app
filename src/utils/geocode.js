const request=require('request')
const geocode=(postalcode,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ postalcode +'.json?access_token=pk.eyJ1IjoiZ2F1dGFtZ292aW5kYTM4IiwiYSI6ImNsazg0b2JwNTA5bGozZnQ1M2R2YjI0aG4ifQ.geA3JAOAtJw1tGqqrXKAjw'
    
    request({url,json:true},(error,{body})=>{
        
        if (error){
            callback('Unable to connect  mapbox api',undefined)
        }
        else if (body.features.length===0){
            callback('Unable to find location.Try another search',undefined)
        }
        else {
            
            callback(undefined,{ 
                                    place_name:body.features[0].place_name,
                                    longitude:body.features[0].center[0],
                                    latitude :body.features[0].center[1]

            })
        }

           
    })
}



module.exports = geocode