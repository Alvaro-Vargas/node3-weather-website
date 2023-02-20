const path = require('path');
const express =  require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials') 

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath )
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) 

// Routes

app.get('', (req, res) => {
    res.render('index', {
      title: 'Weather', 
      name: 'Alvaro Vargas'
    });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page', 
    name: 'Alvaro Vargas'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page', 
    name: 'Alvaro Vargas'
  })
})

app.get('/weather', (req, res) => {
 
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  } 
  
  geocode(req.query.address, (err, {location, latitude, longitude} = {}) => {
    if (err) {
      console.log(err);
      return res.send({
        error: 'Error in Geocode', 
        err
      })
    } else {
      forecast(latitude, longitude, (err, {temperature, feelslike, weatherDescription} = {}) => {
        if (err) {
          return res.send({
            error: 'Error in Forecast', 
            err
          })
        }
        
        return res.send({
          location, 
          temperature, 
          feelslike, 
          weatherDescription
        })
      })      
    }
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Alvaro Vargas', 
    errorMessage: 'Help Article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404', 
    name: 'Alvaro Vargas',
    errorMessage: 'Page Not Found'
  })
})

// Start the server ---
app.listen(3000, () => {
  console.log('The server is UP on port 3000');
})

//http://localhost:3000/