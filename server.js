'use strict'
class Forecast{
  constructor(date,describtion){
    this.date=date;
    this.describtion=describtion;
  }
}
class Movies{
  constructor(title,overview,vote_average,vote_count,poster_path,popularity,release_date){
    this.title= title,
    this.overview= overview,
    this.vote_average= vote_average,
    this.vote_count= vote_count,
    this.poster_path= poster_path,
    this.popularity= popularity,
    this.release_date=release_date
  }
}
const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
const axios = require('axios');
app.use(cors())
const weather = require('./data/weather.json')
require('dotenv').config();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MOVIE_API_KEY =process.env.MOVIE_API_KEY;
// a server endpoint 
app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('Hello World') // our endpoint function response
})


app.get('/weather', async (request, response) => {

  const lat = request.query.lat;
  const lon = request.query.lon;
  const weatherBitUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
  try {
    
    const weatherBitResponse = await axios.get(`${weatherBitUrl}?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`);
    if (lat&&lon) {
            let newArr=weatherBitResponse.data.data.map(item=>{
              return new Forecast(item.datetime,item.weather.description)
            })
            response.send(newArr)
          } else {
            response.send('no data found :disappointed:')
          }

  } catch (error) {
    response.json(error.data);
  }

});
//////////////////////
app.get('/movies', async (request, response) => {
  const city_name=request.query.query;
  const moviesUrl='https://api.themoviedb.org/3/search/movie'
  const moviesResponse= await axios.get(`${moviesUrl}?api_key=${MOVIE_API_KEY}&query=${city_name}`)
  if (city_name) {
  let newArr=moviesResponse.data.results.map(element=>{
    return new Movies(element.title,element.overview,element.vote_average,element.vote_count,element.poster_path,element.popularity,element.release_date);  })
  response.send(newArr)
  }else{response.send('no data found :disappointed:')}
});
app.listen(3002) // kick start the express server to work