const { Router } = require('express');
const router = Router();

const { getClientes } = require('../controllers/usuarios.controllers');

router.route('/').get();

module.exports = router;