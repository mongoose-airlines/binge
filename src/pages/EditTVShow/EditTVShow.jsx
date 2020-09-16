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