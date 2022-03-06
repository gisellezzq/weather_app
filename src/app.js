const path = require('path')
const express = require('express')
const hbs =  require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const port = process.env.PORT || 3000
// Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../template/views')
const partial = path.join(__dirname, '../template/partials')

// Set handlebars and view engine
app.set('view engine','hbs')
app.set('views', viewpath)
hbs.registerPartials(partial)

// Set Static
app.use(express.static(publicDirectoryPath))
app.get('', (req, res)=>{

    res.render('index', {
        title: 'weather app',
        name: 'aaa'
    })

})



app.get('/help', (req, res) =>{
    res.render('help', {
        help: 'balala',
        title: 'help',
        name: 'giselle'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'about me',
        name: 'giselle'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address) {
        return res.send({
            error: "provide address"
        })

    }
    geocode(req.query.address, (error, {lat, long, location} = {}) =>{
        if (error){
            return res.send({ error })
        }
        forecast(lat, long, (error, data)=>{
            if (error){
                return res.send({ error })
            }
            res.send({
                forecast: data,
                location,
                address:req.query.address
            })

        })

    })
    
})


app.get('/products', (req, res) =>{
    if(!req.query.search) {
        return res.send({
            error: "provide search"
        })

    }
    console.log(req.query.search)
    res.send({
        products: []
       
    })
})
app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'giselle',
        message: 'help not found'

    })

})


app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'giselle',
        message: 'page not found'

    })

})

app.listen(port, () => {
    console.log('server is up ' + port)
})