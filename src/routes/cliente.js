const { Router } = require('express');
const router = Router();

const { getClientes } = require('../controllers/clientes.controllers');

router.route('/').get(getClientes);

module.exports = router;