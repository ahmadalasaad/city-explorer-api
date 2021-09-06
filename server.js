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
app.use(cors())
const weather = require('./data/weather.json')
// a server endpoint 
app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('Hello World') // our endpoint function response
})
app.get('/weather', (req, res) => {
  const city_name = req.query.city_name
  // const lat = req.query.lat;
  // const lon = req.query.lon;
  if (city_name) {
    const returnObj = weather.find((item) => {
      return item.city_name === city_name;
    });
    if (returnObj) {
      // res.json([returnObj.city_name,returnObj.lat,returnObj.lat]);
      let newArr=returnObj.data.map(item=>{
        return new Forecast(item.datetime,item.weather.description)
      })
      res.send(newArr)
    } else {
      response.send('no data found :disappointed:')
    }
  } else {
    res.json(weather);
  }
})

app.listen(3001) // kick start the express server to work