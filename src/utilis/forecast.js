const request=require("request")

const forecast=(latitude,longitude,callback)=>{
    const url= 'https://api.darksky.net/forecast/f0e36273768e415e5153f736de6b2642/' + latitude + ', ' + longitude + '?units=si'
    request({url,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect to internet",undefined)
        } else if(response.body.error){
            callback("Unable to find location",undefined)
        } else{
            callback(undefined,response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }//
    }
    )
}
module.exports=forecast
