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