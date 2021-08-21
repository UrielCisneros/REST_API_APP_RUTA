const { Router } = require('express');
const router = Router();

const { getPagoComiciones } = require('../controllers/pago_comicion.controllers');

router.route('/').get(getPagoComiciones);

module.exports = router;