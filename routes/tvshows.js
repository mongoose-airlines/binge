const router = require('express').Router();
const tvshowsCtrl = require('../controllers/tvshows');

router.get('/', tvshowsCtrl.index);

router.use(require('../config/auth'));
router.post('/', checkAuth, tvshowsCtrl.create);
router.put('/:id', checkAuth, tvshowsCtrl.update);
router.delete('/:id', checkAuth, tvshowsCtrl.delete);

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;