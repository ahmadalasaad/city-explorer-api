'use strict';
const axios = require('axios');
require('dotenv').config();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const Forecast = require('../models/Forecast.model');
const Cache = require('../helper/cache.helper');
let cacheObject = new Cache();

console.log('================');
console.log('Cache instance created');
console.log('================');

const getWeather= async (request, response) => {

    const lat = request.query.lat;
    const lon = request.query.lon;

    const InMilSec = 50000;
    const oneDayPassed = (Date.now() - cacheObject.timeStamp) > InMilSec;
    if (oneDayPassed) {
      console.log('================');
      console.log('Cache Reset');
      console.log('================');
      cacheObject = new Cache();
    }

    const foundData = cacheObject.foreCast.find(location => location.lat === lat && location.lon === lon);
   
    if (foundData) {
      response.json(foundData.data);
    } else {
      console.log('No Cache data found');
      console.log('================');

    const weatherBitUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
    try {
      
      const weatherBitResponse = await axios.get(`${weatherBitUrl}?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`);
      if (lat&&lon) {
              let data = weatherBitResponse.data.data.map(item=>{
                return new Forecast(item.datetime,item.weather.description)
              })
              console.log('================');
              console.log('Save data into cache');
              console.log('================');
        
              cacheObject.foreCast.push({
                "lat": lat,
                "lon": lon,
                "data": data
              });
              console.log('================');
              console.log(cacheObject);
              console.log('================');
              response.send(data )
            } else {
              response.send('no data found :disappointed:')
            }
  
    } catch (error) {
      response.json(error.data);
    }
    }
  }
  module.exports = getWeather;