const { Router } = require('express');
const router = Router();

const { getProductosGenerales } = require('../controllers/productos.controllers');

router.route('/').get(getProductosGenerales);

module.exports = router;