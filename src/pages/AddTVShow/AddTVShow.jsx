import React, { useState, useEffect, useRef } from 'react';
import './AddTVShow.css';
import { useHistory } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import * as tvshowAPI from '../../services/tvshows-api'

function AddTVShow(props) {

  const history = useHistory();
  const [invalidForm, setValidForm] = useState(true);
  const formRef = useRef();
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

  async function handleAddTVShow(newTVShowData){
    await tvshowAPI.create(newTVShowData);
    history.push('/tvshows');
  }

  useEffect(() => {
    formRef.current.checkValidity() ? setValidForm(false) : setValidForm(true);
  }, [state]);

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