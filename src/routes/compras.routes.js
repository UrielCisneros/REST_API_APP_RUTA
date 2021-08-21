const { Router } = require('express');
const router = Router();

const { getCompras } = require('../controllers/compras.controllers');

router.route('/').get(getCompras);

module.exports = router;