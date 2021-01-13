import tokenService from '../services/tokenService';
const BASE_URL = '/api/movies/';


// services/movies-api.js
export function create(movie) {
    return fetch(BASE_URL, {
          method: "POST",
          headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
          body: JSON.stringify(movie)
    }, {mode: "cors"})
    .then(res => res.json());
}

export function getAll() {
      return fetch(BASE_URL, {mode: "cors"})
      .then(res => res.json())
}
export function deleteOne(id) {
      return fetch(`${BASE_URL}${id}`, {
                method: 'DELETE',
                headers: {'Authorization': 'Bearer ' + tokenService.getToken()}
      }, {mode: "cors"})
      .then(res => res.json());
    }

export function update(movie) {
      return fetch(`${BASE_URL}${movie.id}`, {
            method: 'PUT',
            headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
            body: JSON.stringify(movie)
      }, {mode: 'cors'})
      .then( res => res.json())
}