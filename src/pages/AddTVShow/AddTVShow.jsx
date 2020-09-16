import React, { Component } from 'react';
import './AddTVShow.css';

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
  }

  formRef = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleAddTVShow(this.state.formData);
  };

  handleChange = e => {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value };
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
                <input name="cast" id="cast" type="text" className="active" value={this.state.formData.cast} onChange={this.handleChange} required />
                <label htmlFor="cast">Cast (Separate with commas)</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="description" id="description" type="text" className="active" value={this.state.formData.description} onChange={this.handleChange} />
                <label htmlFor="description">Description</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="releaseDate" id="release" type="text" className="active" value={this.state.formData.releaseDate} onChange={this.handleChange} />
                <label htmlFor="release">Release Year</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="seasons" id="seasons" type="text" className="active" value={this.state.formData.seasons} onChange={this.handleChange} />
                <label htmlFor="seasons">Seasons</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="episodes" id="episodes" type="text" className="active" value={this.state.formData.episodes} onChange={this.handleChange} />
                <label htmlFor="episodes">Episodes</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="imdbRating" id="imdbRating" type="text" className="active" value={this.state.formData.imdbRating} onChange={this.handleChange} />
                <label htmlFor="imdbRating">IMDB Rating</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="image" id="imageURL" type="text" className="active" value={this.state.formData.image} onChange={this.handleChange} />
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
