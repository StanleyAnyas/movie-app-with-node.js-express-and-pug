const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const port = 3001;

// include helmet
const helmet = require('helmet');
app.use(helmet());

let movies = [
    {id: '1588323375416', title: 'Star Wars: Episode IX - The Rise of Skywalker', year: 2019, director: 'J.J. Abrams', rating: 6.6},
    {id: '1588323390624', title: 'The Irishman', year: 2019, director: 'Martin Scorsese', rating: 7.9},
    {id: '1588323412643', title: 'Harry Potter and the Sorcerers Stone', year: 2001, director: 'Chris Columbus', rating: 7.6}, 
];

app.set('view engine', 'pug');

app.get('/hello', (request, response) => {
  response.render('hello', { firstname: "Stacey", lastname: "Hendricks" });
});

app.get('/movies', (request, response) => {
    response.render('movielist', {movies: movies});
});

// show the form to add a new movie
app.get('/addmovie', (request, response) => {
    response.render('addmovie');
});

// add a new movie
app.post('/addmovie', (request, response) => {
    let newMovie = {
        id: Date.now(),
        title: request.body.title,
        year: request.body.year,
        director: request.body.director,
        rating: request.body.rating
    };
    movies = [...movies, newMovie];
    response.redirect('/movies');
});

app.listen(process.env.PORT || port, () => {   
    console.log(`Server listening at http://localhost:${port}/movies`);
});