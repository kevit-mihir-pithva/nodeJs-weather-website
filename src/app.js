const path = require("path")
const express = require("express")
const app = express()
const hbs = require("hbs")
const fetchCordinates = require("./utils/fetchCordinates")
const fetchWeather = require("./utils/fetchWeather")

//Define path for express config
const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

//setUp handlebars engine and views location
app.set('views',viewsPath)
app.set("view engine","hbs")
hbs.registerPartials(partialsPath)

//setUp static files to serve(css files,js files,images,etc....)
app.use(express.static(publicDirectoryPath))

app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather App",
        name:"Mihir Pithva"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About Me",
        name:"Mihir Pithva"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        name:"Mihir Pithva",
        description:" this is help page.."
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide address in url..."
        })
    }
    fetchCordinates(req.query.address,(error,{latitude,longitude,location}={}) => {
        if(error){
            return res.send({
                error
            })
        }
        fetchWeather(latitude,longitude,(error,weatherData)=>{
            if(error){
                return res.send({
                    error
                })
            }
            else{
                res.send({
                    address:req.query.address,
                    location,
                    forcast:weatherData,
                })
            }
        })
        
    })
})

app.get("/curentLocationWeather",(req,res)=>{
    if(!req.query.latitude || !req.query.longitude){
        return res.send({
            error:"You must provide latitude and longitude in url..."
        })
    }
    fetchWeather(req.query.latitude,req.query.longitude,(error,location)=>{
        if(error){
            return res.send({
                error
            })
        }
        res.send({
            location
        })
    })
})


app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"Error Page",
        name:"Mihir Pithva",
        errorMessage:"Help article not found"
    })   
})

app.get("*",(req,res)=>{
    res.render("404",{
        title:"Error Page",
        name:"Mihir Pithva",
        errorMessage:"Page not found"
    })   
})

app.listen(3000,()=>{
    console.log("Servern is on!!!");
})