const Tvshow = require("../models/tvshow")

module.exports = {
    create,
    index,
    delete: deleteOne
}

function create(req, res) {
  req.body.addedBy = req.user._id
  req.body.cast = req.body.cast.split(',');
  Tvshow.create(req.body)
  .then(tvshow => {res.json(tvshow)})
  .catch(err => {res.json(err)})
}

function index(req, res) {
  Tvshow.find({})
  .populate('addedBy')
  .then(tvshows => {res.json(tvshows)})
  .catch(err => {res.json(err)})
}

function deleteOne(req, res) {
  Tvshow.findByIdAndDelete(req.params.id)
  .then(tvshow => {res.json(tvshow)})
  .catch(err => {res.json(err)})
}