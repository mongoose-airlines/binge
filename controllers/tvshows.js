const Tvshow = require('../models/tvshow');

module.exports = {
    create,
}

function create(req, res) {
    req.body.addedBy = req.user._id
    req.body.cast = req.body.cast.split(',');
    Tvshow.create(req.body)
        .then(tvshow => { res.json(tvshow) })
        .catch(err => { res.json(err) })
}