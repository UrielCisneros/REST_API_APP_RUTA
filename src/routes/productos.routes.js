const { Router } = require('express');
const router = Router();

const { getProductos } = require('../controllers/productos.controllers');

router.route('/').get(() => {});

module.exports = router;