
### 23. Stub up the `<AddTVShow>` component (create basic function component and display the page name in a simple HTML element).  Create a CSS file for `<AddTVShow>`, (add a flex display, centering, and a margin) and import it within the component.
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
import './AddTVShow.css';

function AddTVShow(props) {

	return (
		<h3>Add TV Show Page</h3>
	)
}

export default AddTVShow;
```
---
<br>

  
### 24. Import the `<AddTVShow>` component in App.js and write a Route for it such that the user is redirected to log in if they aren't already  (Be sure to pass the user stored in state to the component via props).  
```js
// App.js
import { Route, Redirect } from 'react-router-dom'
import AddTVShow from '../AddTVShow/AddTVShow'
.
.
.

<Route exact path='/tvshows/add' render={() => 
  authService.getUser() ?
    <AddTVShow 
      user={this.state.user}
    />
  :
    <Redirect to='/login' />
}/>
```
---
<br>
  
### 25. Because we're using a function component, we'll need to store our form data and form validation in state using hooks!  Instead of writing a handleChange function for every single form, we can take this opportunity to create a custom hook that will work for any similar setup in the future, regardless of the form fields!  

```bash
mkdir src/hooks
touch src/hooks/useForm.js
```
```js
// useForm.js
import { useState } from 'react';

export const useForm = (initialValues) => {
	const [values, setValues] = useState(initialValues);

	return [
		values,
		e => {
			setValues({
				...values,
				[e.target.name]: e.target.value
			})
		}
	]
}
```
---
<br>

### 26. Import our new custom hook within the `<AddTVShow>` component. We'll also need to import `useState` (we'll use this to manipulate state), `useEffect` (this will be used to update our form validation every time state changes via keypress), `useRef` (this is used to create an object to reference our form for validation), and `useHistory` (this is how we access history via hooks!) from the appropriate places.  Import the tvshows-api too, so we can access all the functions being exported.

```js
import React, { useState, useEffect, useRef } from 'react';
import './AddTVShow.css';
import { useHistory } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import * as tvshowAPI from '../../services/tvshows-api'

function AddTVShow(props) {

	// allows access to history for programmatic routing
	const history = useHistory();
	// initializing the form as invalid
	const [invalidForm, setValidForm] = useState(true);
	// initializes an object to be used for form validation
	const formRef = useRef();
	// use the custom hook to initialize state
  const [state, handleChange] = useForm({
  name: '',
  cast: [],
  description: '',
  seasons: '',
  releaseDate: '',
  episodes: '',
  imdbRating: '',
  image: ''
  })

	// function to handle adding a show via API call
  async function handleAddTVShow(newTVShowData){
    await tvshowAPI.create(newTVShowData);
    history.push('/tvshows');
  }

	// hook responsible for checking form validity on state change
  useEffect(() => {
    formRef.current.checkValidity() ? setValidForm(false) : setValidForm(true);
  }, [state]);

	// submitting the form passes state data to the function above 
  async function handleSubmit(e) {
    e.preventDefault()
    handleAddTVShow(state)
  }

  return (
    <>
      <div className="AddTVShow">
        <form className="col s12" ref={formRef} onSubmit={handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input name="name" id="name" type="text" className="active" value={state.name} onChange={handleChange} required />
                <label htmlFor="name">TV Show Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="cast" id="cast" type="text" className="active" value={state.cast} onChange={handleChange} required/>
                <label htmlFor="cast">Cast (Separate with commas)</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="description" id="description" type="text" className="active" value={state.description} onChange={handleChange}/>
                <label htmlFor="description">Description</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="releaseDate" id="release" type="text" className="active" value={state.releaseDate} onChange={handleChange}/>
                <label htmlFor="release">Release Year</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="seasons" id="seasons" type="text" className="active" value={state.seasons} onChange={handleChange}/>
                <label htmlFor="seasons">Seasons</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="episodes" id="episodes" type="text" className="active" value={state.episodes} onChange={handleChange}/>
                <label htmlFor="episodes">Episodes</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="imdbRating" id="imdbRating" type="text" className="active" value={state.imdbRating} onChange={handleChange}/>
                <label htmlFor="imdbRating">IMDB Rating</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="image" id="imageURL" type="text" className="active" value={state.image} onChange={handleChange}/>
                <label htmlFor="imageURL">Image URL</label>
              </div>
            </div>
            <button
                type="submit"
                className="btn red"
                disabled={invalidForm}
            >
              <i className="material-icons left">add</i>
              Add TV Show
            </button>                           
        </form>
      </div>
    </>
  )
}

export default AddTVShow;
```

---
<br>
   
   
### 27. Write the route / controller function in the back end to index tv shows.  Write the API call in tvshows-api.js to index tv shows.

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
    
### 28. Code the `<TVShowList>` component (create a basic function component and display the page name in a simple HTML element).  Create a CSS file for the `<TVShowList>` page and import it within the component.  Import the `<TVShowList>` component in App.js and write a route for it, (pass the user as props).
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
    user={this.state.user}
  />
}/>
.
.
.
```
---
<br>

### 29. Import the `useState` and `useEffect` hooks to `<TVShowList>` along with the module holding our API calls.  `useEffect` will be used in lieu of `componentDidMount` to invoke an async function that handles getting all tv shows from the database and then setting state.  `useState` is used to manage state for tv shows.
```js
// TVShowList.jsx
import React, { useState, useEffect } from 'react';
import './TVShowList.css';
import * as tvshowAPI from '../../services/tvshows-api'

function TVShowList(props) {

  const [tvshows, setTvshows] = useState([])

	// using IIFE so we can use async and await, can't use async on the useEffect function
  // see docs for details, make sure you use the semicolons!
  //https://developer.mozilla.org/en-US/docs/Glossary/IIFE
  useEffect(() => {
    (async function(){
      const tvshows = await tvshowAPI.getAll();
      setTvshows(tvshows);
    })();
  }, [])

  return (
    <h3>TV Show List</h3>
  );
}

export default TVShowList;
```

---
<br>

### 30. Create a `<TVShowCard>` folder/component in the 'components' directory, stub it up with a presentational component that displays a message when rendered (don't display any props yet).
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

  
### 31. Write the router / controller for deleting a tv show.  Write the API call in tvshow-api.js to handle deleting a tv show by id.  
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
---
<br>

    
### 32. Within `<TVShowList>`, write a function to handle deleting a tv show and adjusting state accordingly.  Import `<TVShowCard>` component in the `<TVShowList>` component and them map props (tvshow, delete, and user) to `<TVShowCard>` components to be rendered.  


```js
// TVShowList.jsx
import React, { useState, useEffect } from 'react';
import './TVShowList.css';
import * as tvshowAPI from '../../services/tvshows-api'
import TVShowCard from '../../components/TVShowCard/TVShowCard'

function TVShowList(props) {

  const [tvshows, setTvshows] = useState([])

  async function handleDeleteTVShow(id){
    await tvshowAPI.deleteOne(id)
    setTvshows(tvshows.filter(t => t._id !== id))
  }

  useEffect(() => {
    (async function(){
      const tvshows = await tvshowAPI.getAll();
      setTvshows(tvshows)
    })();
  }, [])

  return (
    <>
      <div className='TVShowList-grid'>
        {tvshows.map(tvshow =>
          <TVShowCard 
            key={tvshow._id}
            tvshow={tvshow}
            user={props.user}
            handleDeleteTVShow={handleDeleteTVShow}
          />
        )}
      </div>
    </>
  );
}

export default TVShowList;
```

---
<br>

### 33.  Add a Materialize 'Card' to display the info passed in as props for a tv show on the `<TVShowCard>` component, implement a `<Link>` component to add a Materialize button that will pass the movie to '/edit'.
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
    
### 34. Write the router / controller for updating a tv show.  Write the API call in tvshows-api.js to handle updating a tv show by id. 
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

---
<br>

### 35. Create an `<EditTVShow>` folder/component in the 'components' directory, stub it up with another component.  Copy and paste the contents of `<AddTVShow>` to `<EditTVShow>`, then make changes to reflect editing (initialize state using location (notice the `useLocation` hook!), change the 'Add' button to a 'Save' button, flip the initial state of invalidForm to false, swap the create function for update, and add a `<Link>` for the user to cancel and be returned to the tv show list).
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
import React, { useState, useEffect, useRef } from 'react';
import './EditTVShow.css';
import { useForm } from '../../hooks/useForm'
import { Link, useLocation, useHistory } from 'react-router-dom'
import * as tvshowAPI from '../../services/tvshows-api'

function EditTVShow(props) {

  const location = useLocation()
  const history = useHistory()
  const [invalidForm, setValidForm] = useState(false);
  const formRef = useRef();
  const [state, handleChange] = useForm(location.state.tvshow)

  useEffect(() => {
    formRef.current.checkValidity() ? setValidForm(false) : setValidForm(true);
  }, [state]);
 
  async function handleSubmit(e) {
    e.preventDefault()
    await tvshowAPI.update(state)
    history.push('/tvshows')
  }

  return (
    <>
      <div className="EditTVShow">
        <form className="col s12" ref={formRef} onSubmit={handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input name="name" id="name" type="text" className="active" value={state.name} onChange={handleChange} required />
                <label className="active" htmlFor="name">TV Show Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="cast" id="cast" type="text" className="active" value={state.cast} onChange={handleChange} required/>
                <label className="active" htmlFor="cast">Cast (Separate with commas)</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="description" id="description" type="text" className="active" value={state.description} onChange={handleChange}/>
                <label className="active" htmlFor="description">Description</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="releaseDate" id="release" type="text" className="active" value={state.releaseDate} onChange={handleChange}/>
                <label className="active" htmlFor="release">Release Year</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="seasons" id="seasons" type="text" className="active" value={state.seasons} onChange={handleChange}/>
                <label className="active" htmlFor="seasons">Seasons</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="episodes" id="episodes" type="text" className="active" value={state.episodes} onChange={handleChange}/>
                <label className="active" htmlFor="episodes">Episodes</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="imdbRating" id="imdbRating" type="text" className="active" value={state.imdbRating} onChange={handleChange}/>
                <label className="active" htmlFor="imdbRating">IMDB Rating</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="image" id="imageURL" type="text" className="active" value={state.image} onChange={handleChange}/>
                <label className="active" htmlFor="imageURL">Image URL</label>
              </div>
            </div>
            <button
                type="submit"
                className="btn green"
                disabled={invalidForm}
            >
              <i className="material-icons left">add</i>
              Save TV Show
            </button>
            <Link                 
              className="btn red"
              to='/tvshows'
            >
              <i className="material-icons left">undo</i>
              Cancel
            </Link>  
        </form>
      </div>
    </>
  )
}


export default EditTVShow;
```
---
<br>

### 36. Import `<EditTVShow>` in App.js write a route for it (notice how we don't need to pass location because we're using hooks?!?!?!), and pass the user as props.

```js
// App.js
import EditTVShow from '../EditTVShow/EditTVShow';
.
.
.
<Route exact path='/editTV' render={() => 
  authService.getUser() ?
    <EditTVShow
      user={this.state.user}
    />
  :
    <Redirect to='/login' />
}/>
```