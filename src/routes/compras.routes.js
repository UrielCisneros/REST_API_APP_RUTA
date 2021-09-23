const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth');


const { getCompras, createCompra } = require('../controllers/compras.controllers');

router.route('/').get(getCompras);

router.route('/registro').post(createCompra);

module.exports = router;