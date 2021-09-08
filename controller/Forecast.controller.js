'use strict';
const axios = require('axios');
require('dotenv').config();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const Forecast = require('../models/Forecast.model');

const getWeather= async (request, response) => {

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
  
  }
  module.exports = getWeather;