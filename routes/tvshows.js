const router = require('express').Router();
const tvshowsCtrl = require('../controllers/tvshows');

// Public Routes
router.get('/', tvshowsCtrl.index);

// Protected Routes
router.use(require('../config/auth'));
router.post('/', checkAuth, tvshowsCtrl.create);
router.delete('/:id', checkAuth, tvshowsCtrl.delete);
router.put('/:id', checkAuth, tvshowsCtrl.update)

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;