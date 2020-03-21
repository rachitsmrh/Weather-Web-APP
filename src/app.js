const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utilis/geocode')
const forecast=require('./utilis/forecast')
const app=express();
//Define path 
const viewsPath=path.join(__dirname,'../Templates/views')
const partialsPath=path.join(__dirname,"../Templates/partials")
//SetUp handlebars engine
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
// For serving static file
app.use(express.static(path.join(__dirname,'../public')))
app.get('',(req,res)=>{
res.render('index',{
    title:"Weather App",
    name:'Rachit Singhal'
})
})

app.get('/help',(req,res)=>{
res.render("help",{
    example:"I Love India",
    title:"help",
    name:'Rachit Singhal'
})
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:"Rachit Singhal"
    })
    
})
app.get('/weather',(req,res)=>{
        if(!req.query.address){
            return res.send({
                error:'You must provide address'
            })
        }
        geocode(req.query.address,(err,{latitude,longitude,location}={})=>{
        if(err){
            //return console.log(err)
            return res.send({
                error:err
            })
        }
        forecast(latitude,longitude,(err,forecastdata)=>{
            if(err){
                //return console.log(err)
                 return res.send({
                    error:err
                })
            }
            res.send({
                location:location,
                forecast:forecastdata,

            })
        })
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide search button'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Rachit Singhal',
        errorMessage:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Rachit Singhal',
        errorMessage:"Page Not Found"
    })
})
app.listen(3000,()=>{
    console.log("Sever is on port 3000")
})