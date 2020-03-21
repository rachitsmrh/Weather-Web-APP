const request=require('request')
const geoCode= (address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiY2hhbXBzbXJoIiwiYSI6ImNrN3R5bTI4azExbm8zZW91ZzBkcGY1ejgifQ.ASq3EN0It0ewsUQP4tVEPA&limit=1'
    request({url,json:true},(err,res)=>{
        if(err){
            callback("Unable to connect to the internet",undefined)
        } else if(res.body.features.length===0){
            callback("Unable to find any search.Try again boy")
        } else {
            callback(undefined,{
             longitude:res.body.features[0].center[0],
             latitude:res.body.features[0].center[1],
            location:res.body.features[0].place_name
            })
            
        }
    })
}

module.exports=geoCode