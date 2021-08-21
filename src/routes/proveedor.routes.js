const { Router } = require('express');
const router = Router();

const { getProveedores } = require('../controllers/proveedor.controllers');

router.route('/').get(getProveedores);

module.exports = router;