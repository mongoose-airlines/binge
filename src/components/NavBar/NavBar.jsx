import React from 'react';

const NavBar = ({ user, handleLogout }) => {
  return(
    <>
      {user ?
      <nav>
        <div className="nav-wrapper">
          <a className=" left" href="/"><img src="https://fontmeme.com/permalink/200705/e2371cf438042048aa22fb9341eadbba.png" height='66' alt="netflix-font" border="0"/></a>
          <ul id="nav-mobile" className="right">
            <li><a href=" " className="nav-link">Welcome, {user.name}</a></li>
            <li><a className="nav-link-a" href="/movies">All Movies</a></li>
            <li><a href="/movies"><i className="material-icons left small">movie</i></a></li>
            <li><a className="nav-link-b" href="/movies/add">Add a Movie</a></li>
            <li><a href="/movies/add"><i className="material-icons left small">add movie</i></a></li>
            <li><a className="nav-link-a" href="/tvshows">All TV Shows</a></li>
            <li><a href="/tvshows"><i className="material-icons left small">tv</i></a></li>
            <li><a className="nav-link-b" href="/tvshows/add">Add a TV Show</a></li>
            <li><a href="/tvshows/add"><i className="material-icons left small">add tv</i></a></li>
            <li><a href=" " className="nav-link" onClick={handleLogout}>Log Out</a></li>
          </ul>
        </div>
      </nav>
    :
      <nav>
        <div className="nav-wrapper">
          <a className=" left" href="/"><img src="https://fontmeme.com/permalink/200705/e2371cf438042048aa22fb9341eadbba.png" height='66' alt="netflix-font" border="0"/></a>
          <ul id="nav-mobile" className="right">
            <li><a className="nav-link" href="/movies">All Movies</a></li>
            <li><a href="/movies"><i className="material-icons left small">movie</i></a></li>
            <li><a className="nav-link" href="/tvshows">All TV Shows</a></li>
            <li><a href="/tvshows"><i className="material-icons left small">tv</i></a></li>
            <li><a href="/login" className="nav-link">Log In</a></li>
            <li><a href="/signup" className="nav-link">Sign Up</a></li>
          </ul>
        </div>
      </nav>
      }
    </>
  )
}

export default NavBar;