import tokenService from '../services/tokenService';
const BASE_URL = '/api/tvshows/';

export function create(tvshow) {
  return fetch(BASE_URL, {
		method: "POST",
		headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
		body: JSON.stringify(tvshow)
  }, {mode: "cors"})
  .then(res => res.json());
}