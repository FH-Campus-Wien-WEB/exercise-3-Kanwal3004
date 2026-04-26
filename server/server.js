const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();

// Parse urlencoded bodies
app.use(bodyParser.json()); 

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

/* Task 1.2: Add a GET /genres endpoint:
   This endpoint returns a sorted array of all the genres of the movies
   that are currently in the movie model.
*/
app.get('/genres', (req, res) => {
  const genresSet = new Set();

  Object.values(movieModel).forEach(movie => {
    movie.Genres.forEach(genre => {
      genresSet.add(genre);
    });
  });

  const genres = Array.from(genresSet).sort();

  res.json(genres);
});

/* Task 1.4: Extend the GET /movies endpoint:
   When a query parameter for a specific genre is given, 
   return only movies that have the given genre
 */
app.get('/movies', function (req, res) {
  //let movies = Object.values(movieModel)
  //res.send(movies);
  res.json(Object.values(movieModel));
})

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
  const id = req.params.imdbID
  //const exists = id in movieModel
 
  if (id in movieModel) {
    res.json(movieModel[id])
  } else {
    res.sendStatus(404)    
  }
})

app.put('/movies/:imdbID', function(req, res) {

  const id = req.params.imdbID
  const exists = id in movieModel

  movieModel[id] = req.body;
  
  if (exists) {
    res.sendStatus(200);
  } else {
    res.status(201).json(req.body);
  }
  
})

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")
