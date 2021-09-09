'use strict'
const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
const getWeather = require('./controller/Forecast.controller')
const getMovies = require('./controller/Movies.controller')
app.use(cors())
require('dotenv').config();
// a server endpoint
const PORT = process.env.PORT;
app.get('/', // our endpoint name
  function (req, res) { // callback function of what we should do with our request
    res.send('Hello World') // our endpoint function response
  });


app.get('/weather', getWeather);
app.get('/movies', getMovies);

app.listen(PORT) // kick start the express server to work