const MOVIE_API_KEY =process.env.MOVIE_API_KEY;
const axios = require('axios');
const Movies = require('../models/Movies.model');
require('dotenv').config();

const getMovies= async (request, response) => {
    const city_name=request.query.query;
    const moviesUrl='https://api.themoviedb.org/3/search/movie'
    const moviesResponse= await axios.get(`${moviesUrl}?api_key=${MOVIE_API_KEY}&query=${city_name}`)
    if (city_name) {
    let newArr=moviesResponse.data.results.map(element=>{
      return new Movies(element.title,element.overview,element.vote_average,element.vote_count,element.poster_path,element.popularity,element.release_date);  })
    response.send(newArr)
    }else{response.send('no data found :disappointed:')}
  }
  module.exports = getMovies;
