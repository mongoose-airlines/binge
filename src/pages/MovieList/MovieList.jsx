import React from 'react'
import './MovieList.css';
import MovieCard from '../../components/MovieCard/MovieCard';


const MovieList = (props) => {
  return ( 
    <>
      <div className='Movie-List-grid'>
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