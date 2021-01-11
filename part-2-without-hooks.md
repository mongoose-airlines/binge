
### 22.  ** -**  Stub up the `<AddTVShow>` component (create basic class component and display the page name in a simple HTML element).  Create a CSS file for `<AddTVShow>`, (add a flex display, centering, and a margin) and import it within the component.
```
mkdir src/pages/AddTVShow
touch src/pages/AddTVShow.jsx src/pages/AddTVShow.css
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

  
### 23.  ** -**  Import the `<AddTVShow>` component in App.js and write a Route for it such that the user is redirected to log in if they aren't.  Import the function to create a tv show in App.js, write a handleAddTVShow function, and pass it to `<AddTVShow>` along with the user stored in state.
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
  
### 24.  ** -**  Add state in `<AddTVShow>` (for formData and form validation).  Create a formRef in `<AddTVShow>` and display a form with all tv show fields and a button to submit the form.  Write the handleSubmit and handleChange functions on `<AddTVShow>`.
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
   
   
### 25.  ** -**  Write the route / controller function in the back end to index tv shows.  Write the API call in tvshows-api.js to index tv shows.

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
    
### 26.  ** -**  Update the componentDidMount lifecycle method to App.js to get all tvshows from the API and store them in state.
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

### 27.  ** -**  Stub up the `<TVShowList>` component (create a basic function component and display the page name in a simple HTML element)  Create a CSS file for the `<TVShowList>` page and import it within the component.  Import the `<TVShowList>` component in App.js and write a route for it, (pass state for tv shows and user as props).
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

  
### 28.  ** -**  Create a `<TVShowCard>` folder/component in the 'components' directory, stub it up with a presentational component that displays a message when rendered (don't display any props yet).
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

  
### 29.  ** -**  Write the router / controller for deleting a tv show.  Write the API call in tvshow-api.js to handle deleting a tv show by id.  Write a handleDeleteTVShow function in App.js and pass it as props to `<TVShowList>`.
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
    
### 30.  ** -**  Import `<TVShowCard>` component in the `<TVShowList>` component and them map props (tvshow, delete, and user) to `<TVShowCard>` components to be rendered.  Add a Materialize 'Card' to display the info passed in as props for a tv show on the `<TVShowCard>` component, implement a `<Link>` component to add a Materialize button that will pass the movie to '/edit'.
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
    
### 31.  ** -**  Write the router / controller for updating a tv show.  Write the API call in tvshows-api.js to handle updating a tv show by id.  Add a handleUpdateTVShow function in App.js.
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
  
### 32.  ** -**  Create an `<EditTVShow>` folder/component in the 'components' directory, stub it up with a class component.  Copy and paste the contents of `<AddTVShow>` to `<EditTVShow>`, then make changes to reflect editing (initialize state using location, change the 'Add' button to a 'Save' button, and add a `<Link>` for the user to cancel and be returned to the tv show list).
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
import './EditMovie.css'
import { Link } from 'react-router-dom';

class EditMovie extends Component {
    state = {
        invalidForm: false,
        formData: this.props.location.state.movie,
        Name: "Edit Movie"
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

### 33.  ** -**  Import `<EditTVShow>` in App.js write a route for it (using location), and pass props (update function, user, and location).

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