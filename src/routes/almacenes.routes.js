const { Router } = require('express');
const router = Router();

const { getAlmacenes } = require('../controllers/almacen.controlles');

router.route('/').get(getAlmacenes);

module.exports = router;