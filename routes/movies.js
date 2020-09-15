const router = require('express').Router();
const moviesCtrl = require('../controllers/movies')

// Public Routes
router.get('/', moviesCtrl.index);

// Protected Routes
router.use(require('../config/auth'));
router.post('/', checkAuth, moviesCtrl.create);

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;