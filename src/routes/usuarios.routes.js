const { Router } = require('express');
const router = Router();

const { getUsuarios } = require('../controllers/usuarios.controllers');

router.route('/').get(getUsuarios);

module.exports = router;