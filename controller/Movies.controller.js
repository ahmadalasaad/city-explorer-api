const MOVIE_API_KEY =process.env.MOVIE_API_KEY;
const axios = require('axios');
const Movies = require('../models/Movies.model');
require('dotenv').config();
const Cache = require('../helper/cache.helper');
let cacheObject = new Cache();

console.log('================');
console.log('Cache instance created');
console.log('================');

const getMovies= async (request, response) => {
    const query=request.query.query;
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

    const moviesUrl='https://api.themoviedb.org/3/search/movie'
    const moviesResponse= await axios.get(`${moviesUrl}?api_key=${MOVIE_API_KEY}&query=${query}`)
    if (query) {
    let data=moviesResponse.data.results.map(element=>{
      return new Movies(element.title,element.overview,element.vote_average,element.vote_count,element.poster_path,element.popularity,element.release_date);  })
      console.log('================');
      console.log('Save data into cache');
      console.log('================');

      cacheObject.movies.push({
        "query": query,
        "data": data
      });
      console.log('================');
      console.log(cacheObject);
      console.log('================');
    response.send(data)
    }else{response.send('no data found :disappointed:')}
  }
  }
  module.exports = getMovies;
