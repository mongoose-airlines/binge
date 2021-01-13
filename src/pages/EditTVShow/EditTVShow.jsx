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