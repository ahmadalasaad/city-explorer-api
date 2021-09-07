'use strict'
class Forecast{
  constructor(date,describtion){
    this.date=date;
    this.describtion=describtion;
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

    // Model the data according to the ticket
    
    // response.json(weatherBitResponse.data.data);
  } catch (error) {
    response.json(error.data);
  }


  // in order to send a request with axios, we need a URL for weatherbit
});





// app.get('/weather', (req, res) => {
//   const city_name = req.query.city_name
//   if (city_name) {
//     const returnObj = weather.find((item) => {
//       return item.city_name === city_name;
//     });
//     if (returnObj) {
//       let newArr=returnObj.data.map(item=>{
//         return new Forecast(item.datetime,item.weather.description)
//       })
//       res.send(newArr)
//     } else {
//       response.send('no data found :disappointed:')
//     }
//   } else {
//     res.json(weather);
//   }
// })


app.listen(3002) // kick start the express server to work