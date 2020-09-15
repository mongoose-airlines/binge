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