const Movie = require('../models/movie')

module.exports = {
    create,
}

function create(req, res) {
    req.body.addedBy = req.user._id
    req.body.cast = req.body.cast.split(',');
    Movie.create(req.body)
        .then(movie => { res.json(movie) })
        .catch(err => { res.json(err) })
}