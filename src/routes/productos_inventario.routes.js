const { Router } = require('express');
const router = Router();

const { getProductosGenerales, createProducto, getProductosEmpresa } = require('../controllers/productos.controllers');

router.route('/obtener/:idEmpresa').get(getProductosEmpresa);

router.route('/registrar').post(createProducto);

module.exports = router;