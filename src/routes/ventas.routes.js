const { Router } = require('express');
const router = Router();

const { getVentas } = require('../controllers/ventas.controllers');

router.route('/').get(getVentas);

module.exports = router;