
const path=require('path')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express=require('express')
const { Console } = require('console')

const app=express()

// Define paths for Express Config
const publicdirectory=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')
// Setup Handlebars and views location
app.set('view engine', 'hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)

// Setup Static Directory to serve
app.use(express.static(publicdirectory))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Gautam'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Gautam'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'This is some helpful text.',
        title:'Help me',
        name:'Gautam'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.postalcode) {
        return res.send({
            error: 'You must provide a postalcode! of your area'
        })
    }

    geocode(req.query.postalcode, (error, { latitude, longitude, place_name } = {}) => {
        
        if (error) {
            
            return res.send({ error })
        }
        console.log(place_name)
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                place_name,
                postalcode: req.query.postalcode
            })
        })
    })
})


app.get('/products',(req,res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
}
)
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'help releated page does not exits',
        name:'HTTP Error',
        errorMessage:'Page not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'HTTP Error',
        errorMessage:'Page not found'
    })
})

// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })
// app.get('/weather',(req,res)=>{
//     res.send(
//         {
//             forecast:'It is snowing',
//             location:'Ottawa'
//         }
//     )
// })
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})