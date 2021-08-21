const { Router } = require('express');
const router = Router();

const { getTraspasos } = require('../controllers/traspasos.controllers');

router.route('/').get(getTraspasos);

module.exports = router;