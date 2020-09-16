## binge
- This repository contains the starter code for Binge. 
---
## Game-Plan
- Start with previewing the app and talking about models/data
- Discuss pseudocode
- Clone the jwt-auth-template repo
- One student at a time, we'll progress through the pseudocode
- Each student will work in a branch locally, then push up and create a pull request

---
## Step-By-Step
   
### Setup / Review Starter Code:
  -  Begin by navigating to the main repository [here](https://github.com/mongoose-airlines/binge) and forking the repo to your personal GitHub
  -  Clone your fork to your local machine and add an upstream so that you're able to pull changes once pull requests have been merged
  ```
  git remote add upstream https://github.com/mongoose-airlines/binge.git
  ```
  -  use `npm i` to install node modules
  -  Add link(s) for Materialize (done)
  -  Add Nav Bar with links to several paths (done)
  -  Create .env file and add `DATABASE_URL` and `SECRET`.  (Ben will share URL)

<br><br>

---
<br>

### 1.  **Gabriela -**  Write the model for Movies & TV Shows.
<br>

### Gabriela will start by checking out into a branch to develop her feature.  (When working in a group, you should NEVER put changes directly into the `main/master` branch of the repository.  The 'git Commander' will push that code once it has been tested for functionality.)

```
git checkout -b models
```
### Now, she'll create the model files and add the code:

```
touch models/movie.js models/tvshow.js
```

<br>

```js
// movie.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cast: {
        type: [String],
        required: true
    },
    description: {
        type: String
    },
    mpaaRating: {
        type: String
    },
    releaseDate: {
        type: Number
    },
    runTime: {
        type: Number
    },
    genre: {
        type: String
    },
    imdbRating: {
        type: Number
    },
    image: {
        type: String
    },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User'},
}, { timestamps: true })

module.exports = mongoose.model('Movie', movieSchema);

```


```js
// tvshow.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tvshowSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cast: {
        type: [String],
        required: true
    },
    description: {
        type: String
    },
    seasons: {
        type: Number
    },
    episodes: {
        type: Number
    },
    releaseDate: {
        type: Number
    },
    imdbRating: {
        type: Number
    },
    image: {
        type: String
    },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User'},
}, { timestamps: true })

module.exports = mongoose.model('Tvshow', tvshowSchema);

```

### Now, Gabriela will push her feature branch to her origin (the fork of the main class code-along) Use `git push <remote> <branch>` to push a branch to a repository.
```
git add .          
git commit -m 'add models'
git push origin models
git checkout main    <-- Don't forget to checkout back to main branch!!!
```
### Gabriela will now log into her GitHub and submit a pull request on her repository with the changes.  One of the instructors will approve/deny the pull request and merge the changes.  **EVERYONE** needs to pull the code after the pull request is merged to prevent merge conflicts.
```
git pull upstream main
```

### If you do end up with merge conflicts because you've added something before pulling code, you can sync back up with the latest commit by using:

```
git fetch --all
git reset --hard upstream/main
```
### Great job Gabriela!
<br>

---

<br>

### 2.  **Cem -**  Stub up the movie & tv show controllers (bring in the model, stub up exports).
```
touch controllers/movies.js controllers/tvshows.js
```
<br>

```js
// controllers/movies.js
const Movie = require('../models/movie')

module.exports = {

}
```
```js
// controllers/tvshows.js
const Tvshow = require('../models/tvshow');

module.exports = {

}
```
<br>

---

<br>

### 3.  **Stavon -**  Stub up movie & tv show routers (no routes, just the router, add checkAuth).

```
touch routes/movies.js routes/tvshows.js
```
```js
// movies.js
const router = require('express').Router();
const moviesCtrl = require('../controllers/movies');

// Public Routes

// Protected Routes
router.use(require('../config/auth'));

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;
```
<br>

```js
// tvshows.js
const router = require('express').Router();
const tvshowsCtrl = require('../controllers/tvshows');

// Public Routes

// Protected Routes
router.use(require('../config/auth'));

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;
```
<br>

---

### 4.  **Brett -**  Configure the movie & tv show routers in server.js.

```js
// server.js
.
.
.
const movieRouter = require('./routes/movies');
const tvshowRouter = require('./routes/tvshows');
.
.
.
app.use('/api/movies', movieRouter);
app.use('/api/tvshows', tvshowRouter);
.
.
.
```
---
<br>

### 5.  **Jam -**  Create movies-api.js & tvshows-api.js (add tokenService and BASE_URL) and import to App.js.

```
touch src/services/movies-api.js src/services/tvshows-api.js
```
```js
// services/movies-api.js
import tokenService from '../services/tokenService';
const BASE_URL = '/api/movies/';
```
<br>

```js
// services/tvshows-api.js
import tokenService from '../services/tokenService';
const BASE_URL = '/api/tvshows/';
```
---
<br>

### 6.  **Tyler -**  Initialize state for movies & tv shows in App.js as empty arrays.

```js
// App.js
.
.
.
state = {
  movies: [],
  tvshows: [],
  user: authService.getUser()
}
.
.
.
```
---
<br>

### 7.  **Alexandria -**  Write the route / controller function in the back end for creating a movie.  Write the API call in movies-api.js to create a movie.

```js
// routes/movies.js
.
.
.
// Protected Routes
router.use(require('../config/auth'));
router.post('/', checkAuth, moviesCtrl.create);
.
.
.
```
```js
// controllers/movies.js
module.exports = {
  create,
}

function create(req, res) {
  req.body.addedBy = req.user._id
  req.body.cast = req.body.cast.split(',');
  Movie.create(req.body)
  .then(movie => {res.json(movie)})
  .catch(err => {res.json(err)})
}
```
```js
// services/movies-api.js
export function create(movie) {
  return fetch(BASE_URL, {
      method: "POST",
      headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
      body: JSON.stringify(movie)
  }, {mode: "cors"})
  .then(res => res.json());
}
```
<br>

---
<br>

### 8.   **David -**  Stub up the `<AddMovie>` component (create basic class component and display the page name in a simple HTML element).  Create a CSS file for `<AddMovie>`, (add a flex display, centering, and a margin) and import it within the component.
```
mkdir src/pages/AddMovie
touch src/pages/AddMovie.jsx src/pages/AddMovie.css
```
```css
/* AddMovie.css */
.AddMovie {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}
```
```js
// AddMovie.jsx
import React, { Component } from 'react';
import './AddMovie.css';

class AddMovie extends Component {
    state = {
    };

    render() {
        return (
            <h3>Add Movie Page</h3>
        )
    }
}

export default AddMovie;
```
---
<br>

### 9.   **Karen -**  Import the `<AddMovie>` component in App.js and write a Route for it such that the user is redirected to log in if they aren't.  Import the function to create a movie in App.js, write a handleAddMovie function, and pass it to `<AddMovie>` along with the user stored in state.

```js
// App.js
import { Route, Redirect } from 'react-router-dom'
import AddMovie from '../AddMovie/AddMovie'
import * as movieAPI from '../../services/movies-api'
.
.
.
handleAddMovie = async newMovieData => {
  const newMovie = await movieAPI.create(newMovieData);
  newMovie.addedBy = {name: this.state.user.name, _id: this.state.user._id}
  this.setState(state => ({
    movies: [...state.movies, newMovie]
  }), () => this.props.history.push('/movies'));
}
.
.
.
<Route exact path='/movies/add' render={() => 
  authService.getUser() ?
    <AddMovie 
      handleAddMovie = {this.handleAddMovie}
      user={this.state.user}
    />
  :
    <Redirect to='/login' />
}/>
```
---
<br>

### 10.  **Pratik -**  Add state in `<AddMovie>` (for formData and form validation).  Create a formRef in `<AddMovie>` and display a form with all movie fields and a button to submit the form.  Write the handleSubmit and handleChange functions on `<AddMovie>`.
```js
// AddMovie.jsx
import React, { Component } from 'react';
import './AddMovie.css';

class AddMovie extends Component {
    state = {
        invalidForm: true,
        formData: {
            name: '',
            cast: [],
            description: '',
            mpaaRating: '',
            releaseDate: '',
            runTime: '',
            genre: '',
            imdbRating: '',
            image: '',
        },
    };

    formRef = React.createRef();

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleAddMovie(this.state.formData);
      };

    handleChange = e => {
        const formData = {...this.state.formData, [e.target.name]: e.target.value};
        this.setState({
        formData,
        invalidForm: !this.formRef.current.checkValidity()
        });
    };


    render() {
        return (
            <>
                <div className="AddMovie">
                    <form className="col s12" ref={this.formRef} onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="name" id="movie_name" type="text" className="active" value={this.state.formData.name} onChange={this.handleChange} required />
                            <label htmlFor="movie_name">Movie Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="cast" id="cast" type="text" className="active" value={this.state.formData.cast} onChange={this.handleChange} required/>
                            <label htmlFor="cast">Cast (Separate with commas)</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="description" id="description" type="text" className="active" value={this.state.formData.description} onChange={this.handleChange}/>
                            <label htmlFor="description">Description</label>
                            </div>
                        </div>
                        <div><label>MPAA Rating</label>
                            <p>
                                <label>  
                                    <input className="with-gap" name="mpaaRating" value="G" onChange={this.handleChange} type="radio"/>
                                    <span>G</span>
                                </label>
                            </p>
                            <p>
                                <label>  
                                    <input className="with-gap" name="mpaaRating" value="PG" onChange={this.handleChange} type="radio"/>
                                    <span>PG</span>
                                </label>
                            </p>
                            <p>
                                <label>  
                                    <input className="with-gap" name="mpaaRating" value="PG-13" onChange={this.handleChange} type="radio"/>
                                    <span>PG-13</span>
                                </label>
                            </p>
                            <p>
                                <label>  
                                    <input className="with-gap" name="mpaaRating" value="R" onChange={this.handleChange} type="radio"/>
                                    <span>R</span>
                                </label>
                            </p>
                            <p>
                                <label>  
                                    <input className="with-gap" name="mpaaRating" value="NC-17" onChange={this.handleChange} type="radio"/>
                                    <span>NC-17</span>
                                </label>
                            </p>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="releaseDate" id="release" type="text" className="active" value={this.state.formData.releaseDate} onChange={this.handleChange}/>
                            <label htmlFor="release">Release Year</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="runTime" id="runtime" type="text" className="active" value={this.state.formData.runTime} onChange={this.handleChange}/>
                            <label htmlFor="runtime">Run-time (Min)</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="genre" id="genre" type="text" className="active" value={this.state.formData.genre} onChange={this.handleChange}/>
                            <label htmlFor="genre">Genre</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="imdbRating" id="imdb" type="text" className="active" value={this.state.formData.imdbRating} onChange={this.handleChange}/>
                            <label htmlFor="imdb">IMDB Rating</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="image" id="imageURL" type="text" className="active" value={this.state.formData.image} onChange={this.handleChange}/>
                            <label htmlFor="imageURL">Image URL</label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn red"
                            disabled={this.state.invalidForm}
                        ><i className="material-icons left">add</i>
                            Add Movie
                        </button>                           
                    </form>
                </div>
            </>
        )
    }
}

export default AddMovie;
```
---
<br>
   
### 11.  **Earl -**  Write the route / controller function in the back end to index movies.  Write the API call in movies-api.js to index movies.

```js
// routes/movies.js
const router = require('express').Router();
const moviesCtrl = require('../controllers/movies');

// Public Routes
router.get('/', moviesCtrl.index);

// Protected Routes
router.use(require('../config/auth'));
router.post('/', checkAuth, moviesCtrl.create);


function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;
```
```js
// controllers/movies.js
.
.
.
module.exports = {
  create,
  index,
}

function index(req, res) {
  Movie.find({})
  .populate('addedBy')
  .then(movies => {res.json(movies)})
  .catch(err => {res.json(err)})
}
.
.
.
```
```js
// services/movies-api.js
export function getAll() {
  return fetch(BASE_URL, {mode: "cors"})
  .then(res => res.json())
}
```
---
<br>

### 12.  **Edwin -**  Add a componentDidMount lifecycle method to App.js to get all movies from the API and store them in state.

```js
// App.js
.
.
.
async componentDidMount() {
  const movies = await movieAPI.getAll();
  this.setState({movies})
}
.
.
.
```
---
<br>
  
### 13.  **Dan -**  Stub up the `<MovieList>` component (create a basic function component and display the page name in a simple HTML element).  Create a CSS file for the `<MovieList>` page and import it within the component.  Import the `<MovieList>` component in App.js and write a route for it, (pass state for movies and user as props).
``` 
mkdir src/pages/MovieList
touch src/pages/MovieList/MovieList.jsx 
touch src/pages/MovieList/MovieList.css
```
```css
/* MovieList.css */
.MovieList-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  justify-items: center;
}

@media (max-width: 1500px) {
.MovieList-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  justify-items: center;
  }
}

@media (max-width: 1000px) {
.MovieList-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  justify-items: center;
  }
}
```
```js
// MovieList.jsx
import React from 'react';
import './MovieList.css';

function MovieList(props) {
    return (
        <h3>Movie List</h3>
    );
}

export default MovieList;
```
```js
// App.js
import MovieList from '../MovieList/MovieList';
.
.
.
<Route exact path='/movies' render={() => 
  <MovieList 
    movies = {this.state.movies}
    user={this.state.user}
  />
}/>
.
.
.
```
---
<br>

### 14.  **Anderson -**  Create a `<MovieCard>` component in the 'components' directory, stub it up with a presentational component that displays a message when rendered (don't display any props yet)
```
mkdir src/components/MovieCard
touch src/components/MovieCard/MovieCard.jsx
```
```js
import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard() {
    return(
        <h3>Movie Card</h3>
    ) 
}

export default MovieCard;
```
---
<br>

### 15.  **Robert -**  Write the router / controller for deleting a movie.  Write the API call in movies-api.js to handle deleting a movie by id.  Write a handleDeleteMovie function in App.js and pass it as props to `<MovieList>`.
```js
// routes/movies.js
.
.
.
// Protected Routes
router.use(require('../config/auth'));
router.post('/', checkAuth, moviesCtrl.create);
router.delete('/:id', checkAuth, moviesCtrl.delete);
.
.
.
module.exports = router;
```
```js
// controllers/movies.js
.
.
.
module.exports = {
  create,
  index,
  delete: deleteOne,
}
.
.
.
function deleteOne(req, res) {
  Movie.findByIdAndDelete(req.params.id)
  .then(movie => {res.json(movie)})
  .catch(err => {res.json(err)})
}
```
```js
// services/movies-api.js
export function deleteOne(id) {
  return fetch(`${BASE_URL}${id}`, {
      method: 'DELETE',
      headers: {'Authorization': 'Bearer ' + tokenService.getToken()}
  }, {mode: "cors"})
  .then(res => res.json());
}
```
```js
// App.js
.
.
.
handleDeleteMovie = async id => {
  if(authService.getUser()){
    await movieAPI.deleteOne(id);
    this.setState(state => ({
      movies: state.movies.filter(m => m._id !== id)
    }), () => this.props.history.push('/movies'));
  } else {
    this.props.history.push('/login')
  }
}
.
.
.
<Route exact path='/movies' render={() => 
  <MovieList 
    movies = {this.state.movies}
    user={this.state.user}
    handleDeleteMovie={this.handleDeleteMovie}
  />
}/>
```
---
<br>
    
### 16.  **Will -**  Import `<MovieCard>` component in the `<MovieList>` component and them map props (movie, delete, and user) to `<MovieCard>` components to be rendered.
```js
// MovieList.jsx
import React from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import './MovieList.css';

function MovieList(props) {
    return (
        <> 
            <div className='MovieList-grid'>
                {props.movies.map(movie =>
                    <MovieCard 
                        key={movie._id}
                        movie={movie}
                        handleDeleteMovie={props.handleDeleteMovie}
                        user={props.user}
                    />
                )}
            </div>
        </>
    );
}

export default MovieList;
```
---
<br>

### 17.  **Chloe -**  Add a Materialize 'Card' to display the info passed in as props for a movie on the `<MovieCard>` component, implement a `<Link>` component to add a Materialize button that will pass the movie to '/edit'.
```js
// MovieCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ user, movie, handleDeleteMovie}) {
    return(
        <>
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    <img alt="movie" className="activator" src={movie.image ? movie.image : "https://www.cebodtelecom.com/wp-content/uploads/2014/09/related_post_no_available_image.png"} onClick={()=> {}}/>
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">{movie.name}<i className="material-icons right">more_vert</i></span>
                    <p>{movie.description}</p>
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{movie.name}<i className="material-icons right">close</i></span>
                    <h6>Added By:  {movie.addedBy.name}</h6>
                    <h6>IMDB Rating: {movie.imdbRating}</h6>
                    <div>Genre:  {movie.genre}</div>
                    <div>Release Year:  {movie.releaseDate}</div>
                    <div>Cast: {movie.cast.join(', ')}</div>
                    <div>MPAA Rating:  {movie.mpaaRating}</div>
                    <p>{movie.description}</p>
                    {user && (user._id === movie.addedBy._id) &&
                        <>
                            <button type="submit" className="btn red" onClick={() => handleDeleteMovie(movie._id)}>
                            <i className="material-icons left">delete</i>    
                                Delete Movie
                            </button>
                            <Link 
                                className="btn yellow black-text"
                                to={{
                                    pathname: '/edit',
                                    state: {movie}
                                }}
                            ><i className="material-icons left">build</i>
                                Edit Movie
                            </Link>
                        </>
                        }
                </div>
            </div>
        </>
    ) 
}

export default MovieCard;
```
---
<br>

### 18.  **Cory -**  Write the router / controller for updating a movie.  Write the API call in movies-api.js to handle updating a movie by id.  Add a handleUpdateMovie function in App.js.
```js
// routes/movies.js
const router = require('express').Router();
const moviesCtrl = require('../controllers/movies');

// Public Routes
router.get('/', moviesCtrl.index);

// Protected Routes
router.use(require('../config/auth'));
router.post('/', checkAuth, moviesCtrl.create);
router.delete('/:id', checkAuth, moviesCtrl.delete);
router.put('/:id', checkAuth, moviesCtrl.update)


function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;
```
```js
// controllers/movies.js
const Movie = require('../models/movie')

module.exports = {
  create,
  index,
  delete: deleteOne,
  update
}
.
.
.
function update(req, res) {
  Movie.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .populate('addedBy')
  .then(movie => {res.json(movie)})
  .catch(err => {res.json(err)})
}
```
```js
// services/movies-api.js
export function update(movie) {
  return fetch(`${BASE_URL}${movie._id}`, {
      method: "PUT",
      headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
      body: JSON.stringify(movie)
  }, {mode: "cors"})
  .then(res => res.json());
}
```
```js
// App.js
.
.
.
handleUpdateMovie = async updatedMovieData => {
  const updatedMovie = await movieAPI.update(updatedMovieData);
  const newMoviesArray = this.state.movies.map(m => 
    m._id === updatedMovie._id ? updatedMovie : m
  );
  this.setState(
    {movies: newMoviesArray},
    () => this.props.history.push('/movies')
  );
}
.
.
.
```
---
<br>

### 19.  **Alex -**  Create an `<EditMovie>` folder/component in the 'components' directory.  Create the matching CSS file and add the same formatting from `<AddMovie>`.  Copy and paste the contents of `<AddMovie>` to `<EditMovie>`, then make changes to reflect editing (initialize state using location, change the 'Add' button to a 'Save' button, and update the MPAA rating fields to show the current value when the page is loaded, and add a `<Link>` for the user to cancel and be returned to the movie list).
```
mkdir src/pages/EditMovie
touch src/pages/EditMovie/EditMovie.jsx
touch src/pages/EditMovie/EditMovie.css
```
```css
/* EditMovie.css */
.EditMovie {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}
```
```js
import React, { Component } from 'react';
import './EditMovie.css'
import { Link } from 'react-router-dom';

class EditMovie extends Component {
    state = {
        invalidForm: false,
        formData: this.props.location.state.movie,
    };

    formRef = React.createRef();

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleUpdateMovie(this.state.formData);
      };

    handleChange = e => {
        const formData = {...this.state.formData, [e.target.name]: e.target.value};
        this.setState({
        formData,
        invalidForm: !this.formRef.current.checkValidity()
        });
    };


    render() {
        return (
            <>
                <div className="EditMovie">
                    <form className="col s12" ref={this.formRef} onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="name" id="movie_name" type="text" className="active" value={this.state.formData.name} onChange={this.handleChange} required />
                            <label className="active" htmlFor="movie_name">Movie Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="cast" id="cast" type="text" className="active" value={this.state.formData.cast.join(', ')} onChange={this.handleChange} required/>
                            <label className="active" htmlFor="cast">Cast (Separate with commas)</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="description" id="description" type="text" className="active" value={this.state.formData.description} onChange={this.handleChange}/>
                            <label className="active" htmlFor="description">Description</label>
                            </div>
                        </div>
                        <div><label>MPAA Rating</label>
                            <p>
                                <label>  
                                    <input className="with-gap" name="mpaaRating" value="G" checked={this.state.formData.mpaaRating === "G" ? true : "" } onChange={this.handleChange} type="radio"/>
                                    <span>G</span>
                                </label>
                            </p>
                            <p>
                                <label>  
                                    <input className="with-gap" name="mpaaRating" value="PG" checked={this.state.formData.mpaaRating === "PG" ? true : "" } onChange={this.handleChange} type="radio"/>
                                    <span>PG</span>
                                </label>
                            </p>
                            <p>
                                <label>  
                                    <input className="with-gap" name="mpaaRating" value="PG-13" checked={this.state.formData.mpaaRating === "PG-13" ? true : "" } onChange={this.handleChange} type="radio"/>
                                    <span>PG-13</span>
                                </label>
                            </p>
                            <p>
                                <label>  
                                    <input className="with-gap" name="mpaaRating" value="R" checked={this.state.formData.mpaaRating === "R" ? true : "" } onChange={this.handleChange} type="radio"/>
                                    <span>R</span>
                                </label>
                            </p>
                            <p>
                                <label>  
                                    <input className="with-gap" name="mpaaRating" value="NC-17" checked={this.state.formData.mpaaRating === "NC-17" ? true : "" } onChange={this.handleChange} type="radio"/>
                                    <span>NC-17</span>
                                </label>
                            </p>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="releaseDate" id="release" type="text" className="active" value={this.state.formData.releaseDate} onChange={this.handleChange}/>
                            <label className="active" htmlFor="release">Release Year</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="runTime" id="runtime" type="text" className="active" value={this.state.formData.runTime} onChange={this.handleChange}/>
                            <label className="active" htmlFor="runtime">Run-time (Min)</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="genre" id="genre" type="text" className="active" value={this.state.formData.genre} onChange={this.handleChange}/>
                            <label className="active"htmlFor="genre">Genre</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="imdbRating" id="imdb" type="text" className="active" value={this.state.formData.imdbRating} onChange={this.handleChange}/>
                            <label className="active" htmlFor="imdb">IMDB Rating</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="image" id="imageURL" type="text" className="active" value={this.state.formData.image} onChange={this.handleChange}/>
                            <label className="active" htmlFor="imageURL">Image URL</label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn green"
                            disabled={this.state.invalidForm}
                        ><i className="material-icons left">edit</i>
                            Update Movie
                        </button>
                        <Link 
                            className="btn red"
                            to={{
                                pathname: '/movies'
                            }}
                        ><i className="material-icons left">undo</i>
                        Cancel
                        </Link>                            
                    </form>
                </div>
            </>
        )
    }
}

export default EditMovie;
```
---
<br>
  
### 20.  **Julio -**  Import `<EditMovie>` in App.js write a route for it (using location), and pass props (update function, user, and location).
```js
// App.js
import EditMovie from '../EditMovie/EditMovie';
.
.
.
<Route exact path='/edit' render={({location}) => 
  authService.getUser() ?
    <EditMovie
      handleUpdateMovie={this.handleUpdateMovie}
      location={location}
      user={this.state.user}
    />
  :
    <Redirect to='/login'/>
}/>
```
---
<br>
    
### 21. **Alexandria -**  Write the route / controller function in the back end for creating a tv show.  Write the API call in tvshows-api.js to create a tv show.
```js
// routes/tvshows.js
.
.
.
// Protected Routes
router.use(require('../config/auth'));
router.post('/', checkAuth, tvshowsCtrl.create);
.
.
.
```
```js
// controllers/tvshows.js
module.exports = {
  create,
}

function create(req, res) {
  req.body.addedBy = req.user._id
  req.body.cast = req.body.cast.split(',');
  Tvshow.create(req.body)
  .then(tvshow => {res.json(tvshow)})
  .catch(err => {res.json(err)})
}
```
```js
// services/tvshows-api.js
export function create(tvshow) {
  return fetch(BASE_URL, {
      method: "POST",
      headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
      body: JSON.stringify(tvshow)
  }, {mode: "cors"})
  .then(res => res.json());
}
```
<br>

---
<br>

  
### 22.  **Brett -**  Stub up the `<AddTVShow>` component (create basic class component and display the page name in a simple HTML element).  Create a CSS file for `<AddTVShow>`, (add a flex display, centering, and a margin) and import it within the component.
```
mkdir src/pages/AddTVShow
touch src/pages/AddTVShow/AddTVShow.jsx src/pages/AddTVShow/AddTVShow.css
```
```css
/* AddTVShow.css */
.AddTVShow {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}
```
```js
// AddTVShow.jsx
import React, { Component } from 'react';
import './AddTVShow.css';

class AddTVShow extends Component {
    state = {
    };

    render() {
        return (
            <h3>Add TV Show Page</h3>
        )
    }
}

export default AddTVShow;
```
---
<br>

  
### 23.  **Will -**  Import the `<AddTVShow>` component in App.js and write a Route for it such that the user is redirected to log in if they aren't.  Import the function to create a tv show in App.js, write a handleAddTVShow function, and pass it to `<AddTVShow>` along with the user stored in state.
```js
// App.js
import { Route, Redirect } from 'react-router-dom'
import AddTVShow from '../AddTVShow/AddTVShow'
import * as tvshowAPI from '../../services/tvshows-api'
.
.
.
handleAddTVShow = async newTVShowData => {
  const newTVShow = await tvshowAPI.create(newTVShowData);
  newTVShow.addedBy = {name: this.state.user.name, _id: this.state.user._id}
  this.setState(state => ({
    tvshows: [...state.tvshows, newTVShow]
  }), () => this.props.history.push('/tvshows'));
}
.
.
.
<Route exact path='/tvshows/add' render={() => 
  authService.getUser() ?
    <AddTVShow 
      handleAddTVShow = {this.handleAddTVShow}
      user={this.state.user}
    />
  :
    <Redirect to='/login' />
}/>
```
---
<br>
  
### 24.  **Jam -**  Add state in `<AddTVShow>` (for formData and form validation).  Create a formRef in `<AddTVShow>` and display a form with all tv show fields and a button to submit the form.  Write the handleSubmit and handleChange functions on `<AddTVShow>`.
```js
// AddTVShow.jsx
import React, { Component } from 'react';
import './AddTVShow.css'

class AddTVShow extends Component {
    state = {
        invalidForm: true,
        formData: {
            name: '',
            cast: [],
            description: '',
            seasons: '',
            releaseDate: '',
            episodes: '',
            imdbRating: '',
            image: ''
        }
    };

    formRef = React.createRef();

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleAddTVShow(this.state.formData);
      };

    handleChange = e => {
        const formData = {...this.state.formData, [e.target.name]: e.target.value};
        this.setState({
        formData,
        invalidForm: !this.formRef.current.checkValidity()
        });
    };

    render() {
        return (
            <>
                <div className="AddTVShow">
                    <form className="col s12" ref={this.formRef} onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="name" id="name" type="text" className="active" value={this.state.formData.name} onChange={this.handleChange} required />
                            <label htmlFor="name">TV Show Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="cast" id="cast" type="text" className="active" value={this.state.formData.cast} onChange={this.handleChange} required/>
                            <label htmlFor="cast">Cast (Separate with commas)</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="description" id="description" type="text" className="active" value={this.state.formData.description} onChange={this.handleChange}/>
                            <label htmlFor="description">Description</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="releaseDate" id="release" type="text" className="active" value={this.state.formData.releaseDate} onChange={this.handleChange}/>
                            <label htmlFor="release">Release Year</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="seasons" id="seasons" type="text" className="active" value={this.state.formData.seasons} onChange={this.handleChange}/>
                            <label htmlFor="seasons">Seasons</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="episodes" id="episodes" type="text" className="active" value={this.state.formData.episodes} onChange={this.handleChange}/>
                            <label htmlFor="episodes">Episodes</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="imdbRating" id="imdbRating" type="text" className="active" value={this.state.formData.imdbRating} onChange={this.handleChange}/>
                            <label htmlFor="imdbRating">IMDB Rating</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="image" id="imageURL" type="text" className="active" value={this.state.formData.image} onChange={this.handleChange}/>
                            <label htmlFor="imageURL">Image URL</label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn red"
                            disabled={this.state.invalidForm}
                        ><i className="material-icons left">add</i>
                            Add TV Show
                        </button>                           
                    </form>
                </div>
            </>
        )
    }
}

export default AddTVShow;
```
---
<br>
   
   
### 25.  **Anderson -**  Write the route / controller function in the back end to index tv shows.  Write the API call in tvshows-api.js to index tv shows.

```js
// routes/tvshows.js
const router = require('express').Router();
const tvshowsCtrl = require('../controllers/tvshows');

// Public Routes
router.get('/', tvshowsCtrl.index);

// Protected Routes
router.use(require('../config/auth'));
router.post('/', checkAuth, tvshowsCtrl.create);


function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;
```
```js
// controllers/tvshows.js
.
.
.
module.exports = {
  create,
  index,
}

function index(req, res) {
  Tvshow.find({})
  .populate('addedBy')
  .then(tvshows => {res.json(tvshows)})
  .catch(err => {res.json(err)})
}
.
.
.
```
```js
// services/tvshows-api.js
export function getAll() {
  return fetch(BASE_URL, {mode: "cors"})
  .then(res => res.json())
}
```
---
<br>
    
### 26.  **Gabriela -**  Update the componentDidMount lifecycle method to App.js to get all tvshows from the API and store them in state.
```js
.
.
.
async componentDidMount() {
  const movies = await movieAPI.getAll();
  const tvshows = await tvshowAPI.getAll();
  this.setState({movies, tvshows})
}
.
.
.
```   
---
<br>

### 27.  **Robert -**  Stub up the `<TVShowList>` component (create a basic function component and display the page name in a simple HTML element)  Create a CSS file for the `<TVShowList>` page and import it within the component.  Import the `<TVShowList>` component in App.js and write a route for it, (pass state for tv shows and user as props).
``` 
mkdir src/pages/TVShowList
touch src/pages/TVShowList/TVShowList.jsx 
touch src/pages/TVShowList/TVShowList.css
```
```css
/* TVShowList.css */
.TVShowList-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  justify-items: center;
}

@media (max-width: 1500px) {
.TVShowList-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  justify-items: center;
  }
}

@media (max-width: 1000px) {
.TVShowList-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  justify-items: center;
  }
}
```
```js
// TVShowList.jsx
import React from 'react';
import './TVShowList.css';

function TVShowList(props) {
    return (
        <h3>TV Show List</h3>
    );
}

export default TVShowList;
```
```js
// App.js
import TVShowList from '../TVShowList/TVShowList';
.
.
.
<Route exact path='/tvshows' render={() => 
  <TVShowList 
    tvshows = {this.state.tvshows}
    user={this.state.user}
  />
}/>
.
.
.
```
---
<br>

  
### 28.  **Dan -**  Create a `<TVShowCard>` folder/component in the 'components' directory, stub it up with a presentational component that displays a message when rendered (don't display any props yet).
```
mkdir src/components/TVShowCard
touch src/components/TVShowCard/TVShowCard.jsx
```
```js
import React from 'react';
import { Link } from 'react-router-dom';

function TVShowCard() {
    return(
        <h3>TV Show Card</h3>
    ) 
}

export default TVShowCard;
```
---
<br>

  
### 29.  **Kailah -**  Write the router / controller for deleting a tv show.  Write the API call in tvshow-api.js to handle deleting a tv show by id.  Write a handleDeleteTVShow function in App.js and pass it as props to `<TVShowList>`.
```js
// routes/tvshows.js
.
.
.
// Protected Routes
router.use(require('../config/auth'));
router.post('/', checkAuth, tvshowsCtrl.create);
router.delete('/:id', checkAuth, tvshowsCtrl.delete);
.
.
.
module.exports = router;
```
```js
// controllers/tvshows.js
.
.
.
module.exports = {
  create,
  index,
  delete: deleteOne,
}
.
.
.
function deleteOne(req, res) {
  Tvshow.findByIdAndDelete(req.params.id)
  .then(tvshow => {res.json(tvshow)})
  .catch(err => {res.json(err)})
}
```
```js
// services/tvshows-api.js
export function deleteOne(id) {
  return fetch(`${BASE_URL}${id}`, {
      method: 'DELETE',
      headers: {'Authorization': 'Bearer ' + tokenService.getToken()}
  }, {mode: "cors"})
  .then(res => res.json());
}
```
```js
// App.js
.
.
.
handleDeleteTVShow = async id => {
  if(authService.getUser()){
    await tvshowAPI.deleteOne(id);
    this.setState(state => ({
      tvshows: state.tvshows.filter(t => t._id !== id)
    }), () => this.props.history.push('/tvshows'));
  } else {
    this.props.history.push('/login')
  }
}
.
.
.
<Route exact path='/tvshows' render={() => 
  <TVShowList 
    tvshows = {this.state.tvshows}
    user={this.state.user}
    handleDeleteTVShow={this.handleDeleteTVShow}
  />
}/>
```
---
<br>
    
### 30.  **Karen -**  Import `<TVShowCard>` component in the `<TVShowList>` component and them map props (tvshow, delete, and user) to `<TVShowCard>` components to be rendered.  Add a Materialize 'Card' to display the info passed in as props for a tv show on the `<TVShowCard>` component, implement a `<Link>` component to add a Materialize button that will pass the movie to '/edit'.
```js
// TVShowList.jsx
import React from 'react';
import TVShowCard from '../../components/TVShowCard/TVShowCard'
import './TVShowList.css';

function TVShowList(props) {
    return (
        <>
            <div className='TVShowList-grid'>
                {props.tvshows.map(tvshow =>
                    <TVShowCard 
                        key={tvshow._id}
                        tvshow={tvshow}
                        user={props.user}
                        handleDeleteTVShow={props.handleDeleteTVShow}
                    />
                )}
            </div>
        </>
    );
}

export default TVShowList;
```
```js
// TVShowCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function TVShowCard({ user, tvshow, handleDeleteTVShow }) {
    return(
        <>
            <div className=" card">
                <div className="card-image waves-effect waves-block waves-light">
                    <img alt="tvshow" className="activator" src={tvshow.image ? tvshow.image : "https://www.cebodtelecom.com/wp-content/uploads/2014/09/related_post_no_available_image.png"} onClick={()=> {}}/>
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">{tvshow.name}<i className="material-icons right">more_vert</i></span>
                    <p>{tvshow.description}</p>
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{tvshow.name}<i className="material-icons right">close</i></span>
                    <h6>Added By:  {tvshow.addedBy.name}</h6>
                    <h6>IMDB Rating: {tvshow.imdbRating}</h6>
                    <div>Release Year:  {tvshow.releaseDate}</div>
                    <div>Cast: {tvshow.cast.join(', ')}</div>
                    <div>Seasons:  {tvshow.seasons}</div>
                    <div>Episodes:  {tvshow.episodes}</div>
                    <p>{tvshow.description}</p>
                    {user && (user._id === tvshow.addedBy._id) &&
                        <>
                            <button type="submit" className="btn red" onClick={() => handleDeleteTVShow(tvshow._id)}>
                            <i className="material-icons left">delete</i>    
                                Delete TV Show
                            </button>
                            <Link 
                                className="btn yellow black-text"
                                to={{
                                    pathname: '/editTV',
                                    state: {tvshow}
                                }}
                            ><i className="material-icons left">build</i>
                                Edit TV Show
                            </Link>
                        </>
                    }
                </div>
            </div>
        </>
    ) 
}

export default TVShowCard;
```
---
<br>
    
### 31.  **Cory -**  Write the router / controller for updating a tv show.  Write the API call in tvshows-api.js to handle updating a tv show by id.  Add a handleUpdateTVShow function in App.js.
```js
// routes/tvshows.js
const router = require('express').Router();
const tvshowsCtrl = require('../controllers/tvshows');

// Public Routes
router.get('/', tvshowsCtrl.index);

// Protected Routes
router.use(require('../config/auth'));
router.post('/', checkAuth, tvshowsCtrl.create);
router.put('/:id', checkAuth, tvshowsCtrl.update);
router.delete('/:id', checkAuth, tvshowsCtrl.delete);

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;
```
```js
// controllers/tvshows.js
const Tvshow = require('../models/tvshow');

module.exports = {
    index,
    create, 
    update,
    delete: deleteOne
}
.
.
.
function update(req, res) {
    Tvshow.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .populate('addedBy')
    .then(tvshow => {res.json(tvshow)})
    .catch(err => {res.json(err)})
}
```
```js
// services/tvshows-api.js
export function update(tvshow) {
    return fetch(`${BASE_URL}${tvshow._id}`, {
        method: "PUT",
        headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
        body: JSON.stringify(tvshow)
    }, {mode: "cors"})
    .then(res => res.json());
}
```
```js
// App.js
.
.
.
handleUpdateTVShow = async updatedTVShowData => {
  const updatedTVShow = await tvshowAPI.update(updatedTVShowData);
  const newTVShowsArray = this.state.tvshows.map(t => 
    t._id === updatedTVShow._id ? updatedTVShow : t
  );
  this.setState(
    {tvshows: newTVShowsArray},
    () => this.props.history.push('/tvshows')
  );
}
.
.
.
```
---
<br>
  
### 32.  **Stavon -**  Create an `<EditTVShow>` folder/component in the 'components' directory, stub it up with a class component.  Copy and paste the contents of `<AddTVShow>` to `<EditTVShow>`, then make changes to reflect editing (initialize state using location, change the 'Add' button to a 'Save' button, and add a `<Link>` for the user to cancel and be returned to the tv show list).
```
mkdir src/pages/EditTVShow
touch src/pages/EditTVShow/EditTVShow.jsx
touch src/pages/EditTVShow/EditTVShow.css
```
```css
.EditTVShow {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}
```
```js
// EditTVShow.jsx
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EditTVShowPage extends Component {
    state = {
        invalidForm: false,
        formData: this.props.location.state.tvshow
    };

    formRef = React.createRef();

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleUpdateTVShow(this.state.formData);
      };

    handleChange = e => {
        const formData = {...this.state.formData, [e.target.name]: e.target.value};
        this.setState({
        formData,
        invalidForm: !this.formRef.current.checkValidity()
        });
    };

    render() {
        return (
            <>
                <div className="row">
                    <form className="col s12" ref={this.formRef} onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="input-field col s6">
                            <input name="name" id="name" type="text" className="active" value={this.state.formData.name} onChange={this.handleChange} required />
                            <label className="active" htmlFor="name">TV Show Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <input name="cast" id="cast" type="text" className="active" value={this.state.formData.cast.join(', ')} onChange={this.handleChange} required/>
                            <label className="active" htmlFor="cast">Cast (Separate with commas)</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <input name="description" id="description" type="text" className="active" value={this.state.formData.description} onChange={this.handleChange}/>
                            <label className="active" htmlFor="description">Description</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <input name="releaseDate" id="release" type="text" className="active" value={this.state.formData.releaseDate} onChange={this.handleChange}/>
                            <label className="active" htmlFor="release">Release Year</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <input name="seasons" id="seasons" type="text" className="active" value={this.state.formData.seasons} onChange={this.handleChange}/>
                            <label className="active" htmlFor="seasons">Seasons</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <input name="episodes" id="episodes" type="text" className="active" value={this.state.formData.episodes} onChange={this.handleChange}/>
                            <label className="active" htmlFor="episodes">Episodes</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <input name="imdbRating" id="imdbRating" type="text" className="active" value={this.state.formData.imdbRating} onChange={this.handleChange}/>
                            <label className="active" htmlFor="imdbRating">IMDB Rating</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <input name="image" id="imageURL" type="text" className="active" value={this.state.formData.image} onChange={this.handleChange}/>
                            <label className="active" htmlFor="imageURL">Image URL</label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn green"
                            disabled={this.state.invalidForm}
                        ><i className="material-icons left">edit</i>
                            Update TV Show
                        </button>
                        <Link 
                            className="btn red"
                            to={{
                                pathname: '/tvshows'
                            }}
                        ><i className="material-icons left">undo</i>
                        Cancel
                        </Link>                            
                    </form>
                </div>
            </>
        )
    }
}

export default EditTVShowPage;
```
---
<br>

### 33.  **Cem -**  Import `<EditTVShow>` in App.js write a route for it (using location), and pass props (update function, user, and location).

```js
// App.js
import EditTVShow from '../EditTVShow/EditTVShow';
.
.
.
<Route exact path='/editTV' render={({location}) => 
  authService.getUser() ?
    <EditTVShow
      handleUpdateTVShow={this.handleUpdateTVShow}
      location={location}
      user={this.state.user}
    />
  :
    <Redirect to='/login' />
}/>
```